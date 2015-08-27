package stores

import (
	"../models"
	"fmt"
)

func NewUserStore() *UserStore {
	return &UserStore{make(map[string]*models.User), 1}
}

type UserStore struct {
	users   map[string]*models.User
	idCount int
}

// GetAll returns the user map (because we need the ID as key too)
func (s UserStore) GetAll() (result []models.User) {

	for _, user := range s.users {
		result = append(result, *user)
	}

	return result
}

// GetOne user
func (s UserStore) GetOne(id string) (models.User, error) {
	user, ok := s.users[id]
	if ok {
		return *user, nil
	}

	return models.User{}, fmt.Errorf("User for id %s not found", id)
}

// Insert a user
func (s *UserStore) Insert(user models.User) string {
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
func (s *UserStore) Update(user models.User) error {
	_, exists := s.users[user.Id]
	if !exists {
		return fmt.Errorf("User with id %s does not exist", user.Id)
	}
	s.users[user.Id] = &user

	return nil
}
