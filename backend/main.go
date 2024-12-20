package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/riju-stone/path-finder/backend/utils"
)

type InputMatrix struct {
	matrix [][]string
}

type ErrorResponse struct {
	err string `json:"error"`
}

type SuccessResponse struct {
	pathArr []int `json:"path"`
}

func handleFindPath(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	params := InputMatrix{}

	err := decoder.Decode(&params)
	if err != nil {
		utils.FormatResponse(w, r, 400, ErrorResponse{err: "Failed to evaluate Matrix"})
	}
}

func main() {
	router := chi.NewRouter()
	router.Use(middleware.Logger)

	router.Get("/health-check", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Status Ok"))
	})

	router.Get("/find-path", handleFindPath)

	err := http.ListenAndServe(":8000", router)
	if err != nil {
		log.Printf("Error while starting server %s", err)
	}

	log.Println("Listening to localhost:5123")
}
