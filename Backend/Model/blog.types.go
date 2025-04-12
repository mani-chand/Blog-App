package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Reactions struct {
	Likes    int `json:"likes"`
	Dislikes int `json:"dislikes"`
}

type Blog struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title     string             `json:"title"`
	Body      string             `json:"body"`
	Reactions Reactions          `json:"reactions"`
	Tags      []string           `json:"tags"`
	Views     int                `json:"views"`
	UserId    int                `json:"userid"`
}
