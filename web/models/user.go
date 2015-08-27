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

// func (model *User) GobEncode() ([]byte, error) {
// 	w := new(bytes.Buffer)
// 	encoder := gob.NewEncoder(w)
// 	err := encoder.Encode(model.id)
// 	if err != nil {
// 		return nil, err
// 	}
// 	err = encoder.Encode(model.name)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return w.Bytes(), nil
// }

// func (model *User) GobDecode(buf []byte) error {
// 	r := bytes.NewBuffer(buf)
// 	decoder := gob.NewDecoder(r)
// 	err := decoder.Decode(&model.id)
// 	if err != nil {
// 		return err
// 	}
// 	return decoder.Decode(&model.name)
// }
