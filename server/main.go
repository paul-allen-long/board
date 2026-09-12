package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"

	"board-api/server/api"
	"github.com/go-chi/chi/v5"
)

const dataPath = "server/data/board.json"

var errColumnNotFound = errors.New("column not found")
var errTaskNotFound = errors.New("task not found")

type store struct {
	mu   sync.RWMutex
	data api.Board
}

func newStore() (*store, error) {
	contents, err := os.ReadFile(dataPath)
	if err != nil {
		return nil, err
	}
	var data api.Board
	if err := json.Unmarshal(contents, &data); err != nil {
		return nil, err
	}
	return &store{data: data}, nil
}

func (store *store) save() error {
	contents, err := json.MarshalIndent(store.data, "", "  ")
	if err != nil {
		return err
	}
	contents = append(contents, '\n')
	temporaryPath := dataPath + ".tmp"
	if err := os.WriteFile(temporaryPath, contents, 0o644); err != nil {
		return err
	}
	return os.Rename(temporaryPath, dataPath)
}

func (store *store) board() api.Board {
	store.mu.RLock()
	defer store.mu.RUnlock()
	return store.data
}

func (store *store) createColumn(name string) (api.Column, error) {
	name = strings.TrimSpace(name)
	if name == "" {
		return api.Column{}, errors.New("column name is required")
	}
	store.mu.Lock()
	defer store.mu.Unlock()
	colors := []string{"#64748b", "#2563eb", "#8b5cf6", "#10b981", "#f97316"}
	column := api.Column{Id: fmt.Sprintf("column-%d", time.Now().UnixNano()), Name: name, Color: colors[len(store.data.Columns)%len(colors)]}
	store.data.Columns = append(store.data.Columns, column)
	return column, store.save()
}

func (store *store) renameColumn(id string, name string) error {
	name = strings.TrimSpace(name)
	if name == "" {
		return errors.New("column name is required")
	}
	store.mu.Lock()
	defer store.mu.Unlock()
	for index := range store.data.Columns {
		if store.data.Columns[index].Id == id {
			store.data.Columns[index].Name = name
			return store.save()
		}
	}
	return errColumnNotFound
}

func (store *store) deleteColumn(id string) error {
	store.mu.Lock()
	defer store.mu.Unlock()
	if len(store.data.Columns) <= 1 {
		return errors.New("at least one column is required")
	}
	var fallback api.Column
	columns := make([]api.Column, 0, len(store.data.Columns)-1)
	found := false
	for _, column := range store.data.Columns {
		if column.Id == id {
			found = true
			continue
		}
		if fallback.Id == "" {
			fallback = column
		}
		columns = append(columns, column)
	}
	if !found {
		return errColumnNotFound
	}
	store.data.Columns = columns
	for index := range store.data.Tasks {
		if store.data.Tasks[index].ColumnId == id {
			store.data.Tasks[index].ColumnId = fallback.Id
		}
	}
	return store.save()
}

func (store *store) createTask(columnID string) (api.Task, error) {
	store.mu.Lock()
	defer store.mu.Unlock()
	columnExists := false
	for _, column := range store.data.Columns {
		if column.Id == columnID {
			columnExists = true
			break
		}
	}
	if !columnExists {
		return api.Task{}, errColumnNotFound
	}
	nextID := 1
	for _, task := range store.data.Tasks {
		if task.Id >= nextID {
			nextID = task.Id + 1
		}
	}
	task := api.Task{Id: nextID, Key: fmt.Sprintf("DESK-%d", nextID+21), Title: "Новая задача", Label: "Новая", Priority: api.Medium, Assignee: "ВЫ", ColumnId: columnID}
	store.data.Tasks = append(store.data.Tasks, task)
	return task, store.save()
}

func (store *store) moveTask(taskID int, columnID string) error {
	store.mu.Lock()
	defer store.mu.Unlock()
	columnExists := false
	for _, column := range store.data.Columns {
		if column.Id == columnID {
			columnExists = true
			break
		}
	}
	if !columnExists {
		return errColumnNotFound
	}
	for index := range store.data.Tasks {
		if store.data.Tasks[index].Id == taskID {
			store.data.Tasks[index].ColumnId = columnID
			return store.save()
		}
	}
	return errTaskNotFound
}

func (store *store) deleteTask(taskID int) error {
	store.mu.Lock()
	defer store.mu.Unlock()
	for index, task := range store.data.Tasks {
		if task.Id == taskID {
			store.data.Tasks = append(store.data.Tasks[:index], store.data.Tasks[index+1:]...)
			return store.save()
		}
	}
	return errTaskNotFound
}

type server struct{ store *store }

func (server *server) GetBoard(writer http.ResponseWriter, _ *http.Request) {
	writeJSON(writer, http.StatusOK, server.store.board())
}

func (server *server) CreateColumn(writer http.ResponseWriter, request *http.Request) {
	var payload api.CreateColumnJSONRequestBody
	if err := decodeJSON(writer, request, &payload); err != nil {
		return
	}
	column, err := server.store.createColumn(payload.Name)
	if err != nil {
		writeStoreError(writer, err)
		return
	}
	writeJSON(writer, http.StatusCreated, column)
}

func (server *server) RenameColumn(writer http.ResponseWriter, request *http.Request, columnID string) {
	var payload api.RenameColumnJSONRequestBody
	if err := decodeJSON(writer, request, &payload); err != nil {
		return
	}
	if err := server.store.renameColumn(columnID, payload.Name); err != nil {
		writeStoreError(writer, err)
		return
	}
	writer.WriteHeader(http.StatusNoContent)
}

func (server *server) DeleteColumn(writer http.ResponseWriter, _ *http.Request, columnID string) {
	if err := server.store.deleteColumn(columnID); err != nil {
		writeStoreError(writer, err)
		return
	}
	writer.WriteHeader(http.StatusNoContent)
}

func (server *server) CreateTask(writer http.ResponseWriter, request *http.Request) {
	var payload api.CreateTaskJSONRequestBody
	if err := decodeJSON(writer, request, &payload); err != nil {
		return
	}
	task, err := server.store.createTask(payload.ColumnId)
	if err != nil {
		writeStoreError(writer, err)
		return
	}
	writeJSON(writer, http.StatusCreated, task)
}

func (server *server) MoveTask(writer http.ResponseWriter, request *http.Request, taskID int) {
	var payload api.MoveTaskJSONRequestBody
	if err := decodeJSON(writer, request, &payload); err != nil {
		return
	}
	if err := server.store.moveTask(taskID, payload.ColumnId); err != nil {
		writeStoreError(writer, err)
		return
	}
	writer.WriteHeader(http.StatusNoContent)
}

func (server *server) DeleteTask(writer http.ResponseWriter, _ *http.Request, taskID int) {
	if err := server.store.deleteTask(taskID); err != nil {
		writeStoreError(writer, err)
		return
	}
	writer.WriteHeader(http.StatusNoContent)
}

func main() {
	dataStore, err := newStore()
	if err != nil {
		log.Fatal(err)
	}
	router := chi.NewRouter()
	router.Use(cors)
	api.HandlerFromMux(&server{store: dataStore}, router)
	log.Println("API is running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
		writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if request.Method == http.MethodOptions {
			writer.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(writer, request)
	})
}

func decodeJSON(writer http.ResponseWriter, request *http.Request, target any) error {
	request.Body = http.MaxBytesReader(writer, request.Body, 1<<20)
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(target); err != nil {
		writeError(writer, http.StatusBadRequest, "invalid request body")
		return err
	}
	return nil
}

func writeStoreError(writer http.ResponseWriter, err error) {
	if errors.Is(err, errColumnNotFound) || errors.Is(err, errTaskNotFound) {
		writeError(writer, http.StatusNotFound, err.Error())
		return
	}
	writeError(writer, http.StatusBadRequest, err.Error())
}

func writeJSON(writer http.ResponseWriter, status int, value any) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(status)
	_ = json.NewEncoder(writer).Encode(value)
}

func writeError(writer http.ResponseWriter, status int, message string) {
	writeJSON(writer, status, api.Error{Error: message})
}
