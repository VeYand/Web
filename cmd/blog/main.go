package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/gorilla/mux"
)

const (
	port         = ":3000"
	dbDriverName = "mysql"
)

func main() {
	db, err := openDB()
	if err != nil {
		log.Fatal(err)
	}

	dbx := sqlx.NewDb(db, dbDriverName)

	r := mux.NewRouter()

	r.HandleFunc("/home", index(dbx))
	r.HandleFunc("/post/{postID}", post(dbx))
	r.HandleFunc("/admin", admin)
	r.HandleFunc("/login", login)

	r.HandleFunc("/api/post", createPost(dbx)).Methods(http.MethodPost)
	r.HandleFunc("/api/login", userLogIn(dbx)).Methods(http.MethodPost)
	r.HandleFunc("/api/logout", clearCookie(dbx)).Methods(http.MethodPost)

	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	fmt.Println("Start server")
	srv := &http.Server{
		Handler: r,
		Addr: "127.0.0.1:3000",
	}

	log.Fatal(srv.ListenAndServe())
}

func openDB() (*sql.DB, error) {
	return sql.Open(dbDriverName, "root:#######@tcp(localhost:3306)/blog?charset=utf8mb4&collation=utf8mb4_unicode_ci&parseTime=true")
}
