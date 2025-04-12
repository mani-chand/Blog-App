package main

type Reactions struct {
	Likes    int `json:"likes"`
	Dislikes int `json:"dislikes"`
}

type Blog struct {
	Id        int       `json:"id"`
	Title     string    `json:"title"`
	Body      string    `json:"body"`
	Reactions Reactions `json:"reactions"`
	Tags      []string  `json:"tags"`
	Views     int       `json:"views"`
	UserId    int       `json:"userid"`
}
