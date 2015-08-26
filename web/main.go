package main

import (
	"errors"
	"fmt"
	"github.com/manyminds/api2go"
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
		"author":      "The api2go examples crew",
		"license":     "wtfpl",
		"license-url": "http://www.wtfpl.net",
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

type User struct {
	Id   string
	Name string `json:"name"`
}

// GetID to satisfy jsonapi.MarshalIdentifier interface
func (model User) GetID() string {
	return model.Id
}

// SetID to satisfy jsonapi.UnmarshalIdentifier interface
func (model *User) SetID(id string) error {
	model.Id = id
	return nil
}

type UserStore struct {
	users   map[string]*User
	idCount int
}

// GetAll returns the user map (because we need the ID as key too)
func (s UserStore) GetAll() map[string]*User {
	return s.users
}

// GetOne user
func (s UserStore) GetOne(id string) (User, error) {
	user, ok := s.users[id]
	if ok {
		return *user, nil
	}

	return User{}, fmt.Errorf("User for id %s not found", id)
}

// Insert a user
func (s *UserStore) Insert(user User) string {
	id := fmt.Sprintf("%d", s.idCount)
	user.Id = id
	s.users[id] = &user
	s.idCount++
	return id
}

// Delete one :(
func (s *UserStore) Delete(id string) error {
	_, exists := s.users[id]
	if !exists {
		return fmt.Errorf("User with id %s does not exist", id)
	}
	delete(s.users, id)

	return nil
}

// Update a user
func (s *UserStore) Update(user User) error {
	_, exists := s.users[user.Id]
	if !exists {
		return fmt.Errorf("User with id %s does not exist", user.Id)
	}
	s.users[user.Id] = &user

	return nil
}

type UserResource struct {
	UserStore *UserStore
}

func (s UserResource) FindAll(r api2go.Request) (api2go.Responder, error) {
	// var result []User
	users := s.UserStore.GetAll()

	// for _, user := range users {
	// 	// get all sweets for the user
	// 	user.Chocolates = []*model.Chocolate{}
	// 	for _, chocolateID := range user.ChocolatesIDs {
	// 		choc, err := s.ChocStorage.GetOne(chocolateID)
	// 		if err != nil {
	// 			return &Response{}, err
	// 		}
	// 		user.Chocolates = append(user.Chocolates, &choc)
	// 	}
	// 	result = append(result, *user)
	// }

	return &Response{Res: users}, nil
}

// FindOne to satisfy `api2go.DataSource` interface
// this method should return the user with the given ID, otherwise an error
func (s UserResource) FindOne(ID string, r api2go.Request) (api2go.Responder, error) {
	user, err := s.UserStore.GetOne(ID)
	if err != nil {
		return &Response{}, err
	}

	// user.Chocolates = []*model.Chocolate{}
	// for _, chocolateID := range user.ChocolatesIDs {
	// 	choc, err := s.ChocStorage.GetOne(chocolateID)
	// 	if err != nil {
	// 		return &Response{}, err
	// 	}
	// 	user.Chocolates = append(user.Chocolates, &choc)
	// }
	return &Response{Res: user}, nil
}

// Create method to satisfy `api2go.DataSource` interface
func (s UserResource) Create(obj interface{}, r api2go.Request) (api2go.Responder, error) {
	user, ok := obj.(User)
	if !ok {
		return &Response{}, api2go.NewHTTPError(errors.New("Invalid instance given"), "Invalid instance given", http.StatusBadRequest)
	}

	id := s.UserStore.Insert(user)
	user.Id = id

	return &Response{Res: user, Code: http.StatusCreated}, nil
}

// Delete to satisfy `api2go.DataSource` interface
func (s UserResource) Delete(id string, r api2go.Request) (api2go.Responder, error) {
	err := s.UserStore.Delete(id)
	return &Response{Code: http.StatusNoContent}, err
}

//Update stores all changes on the user
func (s UserResource) Update(obj interface{}, r api2go.Request) (api2go.Responder, error) {
	user, ok := obj.(User)
	if !ok {
		return &Response{}, api2go.NewHTTPError(errors.New("Invalid instance given"), "Invalid instance given", http.StatusBadRequest)
	}

	err := s.UserStore.Update(user)
	return &Response{Res: user, Code: http.StatusNoContent}, err
}

func NewUserStore() *UserStore {
	return &UserStore{make(map[string]*User), 1}
}

func main() {
	api := api2go.NewAPI("v1")

	userStore := NewUserStore()
	api.AddResource(User{}, UserResource{UserStore: userStore})
	fmt.Println("Listening on :4001")

	http.ListenAndServe(":4001", api.Handler())
}
