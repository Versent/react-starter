package models

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
