package main

import (
	"./models"
	"./resources"

	"fmt"
	"github.com/boltdb/bolt"
	"github.com/carbocation/interpose"
	// "github.com/justinas/alice"
	"github.com/manyminds/api2go"
	"log"
	// "log"
	"net/http"
)

func main() {
	api := api2go.NewAPI("v1")

	db, err := bolt.Open("db.db", 0600, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	db.Update(func(tx *bolt.Tx) error {
		_, err := tx.CreateBucketIfNotExists([]byte("users"))
		if err != nil {
			return fmt.Errorf("create bucket: %s", err)
		}
		return nil
	})

	userResource := resources.UserResource{Db: db}
	api.AddResource(models.User{}, userResource)
	fmt.Println("Listening on :4001")

	middle := interpose.New()

	middle.UseHandler(http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		rw.Header().Set("Access-Control-Allow-Origin", "*")
		rw.Header().Set("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS")
		rw.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	}))

	middle.UseHandler(api.Handler())

	http.ListenAndServe(":4001", middle)
}
