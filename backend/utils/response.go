package utils

import (
	"encoding/json"
	"net/http"
)

func FormatResponse(w http.ResponseWriter, r *http.Request, statusCode int, payload interface{}) {
	data, err := json.Marshal(payload)
	if err != nil {
		w.WriteHeader(500)
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	w.Write(data)
}
