package models

type User struct {
	ID   string
	Name string `json:"name"`
}

// GetID to satisfy jsonapi.MarshalIdentifier interface
func (model User) GetID() string {
	return model.ID
}

// SetID to satisfy jsonapi.UnmarshalIdentifier interface
func (model *User) SetID(id string) error {
	model.ID = id
	return nil
}
