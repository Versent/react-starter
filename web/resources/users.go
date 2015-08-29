package resources

import (
	"../models"
	"code.google.com/p/go-uuid/uuid"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/boltdb/bolt"
	"github.com/manyminds/api2go"
	"log"
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
	Db *bolt.DB
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
func (s UserResource) FindOne(Id string, r api2go.Request) (api2go.Responder, error) {

	var userJson []byte

	s.Db.View(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("users"))
		userJson = b.Get([]byte(Id))
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
	log.Println("Create")
	user, ok := obj.(models.User)
	if !ok {
		return &Response{}, api2go.NewHTTPError(errors.New("Invalid instance given"), "Invalid instance given", http.StatusBadRequest)
	}

	user.ID = uuid.New()

	userJson, err := json.Marshal(user)
	if err != nil {
		fmt.Println(err)
	}

	_ = s.Db.Update(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("users"))
		err = b.Put([]byte(user.ID), userJson)
		if err != nil {
			log.Println(err.Error())
		}
		return nil
	})

	return &Response{Res: user, Code: http.StatusCreated}, nil
}

// Delete to satisfy `api2go.DataSource` interface
func (s UserResource) Delete(id string, r api2go.Request) (api2go.Responder, error) {
	log.Println("Delete")

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
	log.Println("Update")
	// log.Println(obj)

	user, ok := obj.(models.User)
	if !ok {
		log.Println("Ooops")
	}

	// log.Println(user)

	userJson, err := json.Marshal(user)
	if err != nil {
		fmt.Println(err)
	}

	// TODO: get current first and merge
	_ = s.Db.Update(func(tx *bolt.Tx) error {
		b := tx.Bucket([]byte("users"))
		err = b.Put([]byte(user.ID), userJson)
		if err != nil {
			log.Println(err.Error())
		}
		return nil
	})

	// if !ok {
	// 	return &Response{}, api2go.NewHTTPError(errors.New("Invalid instance given"), "Invalid instance given", http.StatusBadRequest)
	// }

	return &Response{Res: user, Code: http.StatusOK}, nil
}
