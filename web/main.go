package main

import (
	"./models"
	"./stores"
	"code.google.com/p/go-uuid/uuid"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/boltdb/bolt"
	"github.com/carbocation/interpose"
	// "github.com/justinas/alice"
	"github.com/manyminds/api2go"
	"log"
	// "log"
	"net/http"
)

// The Response struct implements api2go.Responder
type Response struct {
	Res  interface{}
	Code int
}

// Metadata returns additional meta data
func (r Response) Metadata() map[string]interface{} {
	return map[string]interface{}{
		"author":  "Sebastian Porto",
		"license": "MIT",
	}
}

// Result returns the actual payload
func (r Response) Result() interface{} {
	return r.Res
}

// StatusCode sets the return status code
func (r Response) StatusCode() int {
	return r.Code
}

type UserResource struct {
	UserStore *stores.UserStore
	Db        *bolt.DB
}

func (s UserResource) FindAll(r api2go.Request) (api2go.Responder, error) {
	var users []models.User
	// users := s.UserStore.GetAll()
	s.Db.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("users"))
		c := b.Cursor()

		for k, v := c.First(); k != nil; k, v = c.Next() {
			fmt.Printf("key=%s, value=%s\n", k, v)

			var user models.User
			err := json.Unmarshal(v, &user)
			if err != nil {
				fmt.Println(err)
			} else {
				users = append(users, user)
			}
		}

		return nil
	})

	return &Response{Res: users}, nil
}

// FindOne to satisfy `api2go.DataSource` interface
// this method should return the user with the given ID, otherwise an error
func (s UserResource) FindOne(ID string, r api2go.Request) (api2go.Responder, error) {

	var userJson []byte

	s.Db.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("users"))
		userJson = b.Get([]byte(ID))
		// fmt.Printf("The answer is: %s\n", userJson)
		return nil
	})

	if len(userJson) == 0 {
		return &Response{}, errors.New("Not found")
	}

	user := models.User{}
	err := json.Unmarshal(userJson, &user)
	if err != nil {
		fmt.Println(err)
	}

	return &Response{Res: user}, nil
}

// Create method to satisfy `api2go.DataSource` interface
func (s UserResource) Create(obj interface{}, r api2go.Request) (api2go.Responder, error) {
	user, ok := obj.(models.User)
	if !ok {
		return &Response{}, api2go.NewHTTPError(errors.New("Invalid instance given"), "Invalid instance given", http.StatusBadRequest)
	}

	user.Id = uuid.New()

	userJson, err := json.Marshal(user)
	if err != nil {
		fmt.Println(err)
	}

	_ = s.Db.Update(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("users"))
		_ = b.Put([]byte(user.Id), userJson)
		return nil
	})

	return &Response{Res: user, Code: http.StatusCreated}, nil
}

// Delete to satisfy `api2go.DataSource` interface
func (s UserResource) Delete(id string, r api2go.Request) (api2go.Responder, error) {
	_ = s.Db.Update(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("users"))
		err := b.Delete([]byte(id))
		if err != nil {
			log.Println(err.Error())
		}
		return nil
	})
	return &Response{Code: http.StatusNoContent}, nil
}

//Update stores all changes on the user
func (s UserResource) Update(obj interface{}, r api2go.Request) (api2go.Responder, error) {
	user, ok := obj.(models.User)
	if !ok {
		return &Response{}, api2go.NewHTTPError(errors.New("Invalid instance given"), "Invalid instance given", http.StatusBadRequest)
	}

	err := s.UserStore.Update(user)
	return &Response{Res: user, Code: http.StatusNoContent}, err
}

func CORS(h http.Handler) http.Handler {
	return http.StripPrefix("/old", h)
}

func myStripPrefix(h http.Handler) http.Handler {
	return http.StripPrefix("/old/", h)
}

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

	userStore := stores.NewUserStore()
	api.AddResource(models.User{}, UserResource{UserStore: userStore, Db: db})
	fmt.Println("Listening on :4001")

	middle := interpose.New()

	middle.UseHandler(http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		rw.Header().Set("Access-Control-Allow-Origin", "*")
		rw.Header().Set("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS")
		rw.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	}))

	middle.UseHandler(api.Handler())

	http.ListenAndServe(":4001", middle)
}
