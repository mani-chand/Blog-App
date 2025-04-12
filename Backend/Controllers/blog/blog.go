package blog

import (
	model "blog/Model"
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func getEnvVar(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}
	return os.Getenv(key)
}

func connect(uri string) (*mongo.Client, context.Context,
	context.CancelFunc, error) {

	// ctx will be used to set deadline for process, here
	// deadline will of 30 seconds.
	ctx, cancel := context.WithTimeout(context.Background(),
		30*time.Second)

	// mongo.Connect return mongo.Client method
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	return client, ctx, cancel, err
}

func CreateBlog(c *gin.Context) {
	mongo_url := getEnvVar("db_url")
	client, ctx, _, err := connect(mongo_url)
	if err != nil {
		fmt.Println("Connection error", err)
	}
	var newBlog model.Blog
	if err := c.BindJSON(&newBlog); err != nil {
		return
	}
	res, err := client.Database("Bloggers").Collection("blogs").InsertOne(ctx, newBlog)
	if err != nil {
		fmt.Print("error", err)
	}
	c.IndentedJSON(http.StatusCreated, res)
}
func GetAllBlogs(c *gin.Context) {
	mongo_url := getEnvVar("db_url")
	client, ctx, _, err := connect(mongo_url)
	if err != nil {
		fmt.Println("Connection error", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection failed"})
		return
	}
	collection := client.Database("Bloggers").Collection("blogs")

	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching blogs"})
		return
	}

	var blogs []model.Blog
	if err := cursor.All(ctx, &blogs); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error decoding blogs"})
		return
	}

	c.IndentedJSON(http.StatusOK, blogs)
}
func GetBlogById(c *gin.Context) {
	data := c.Param("id")
	mongo_url := getEnvVar("db_url")
	client, ctx, _, err := connect(mongo_url)
	if err != nil {
		fmt.Println("Connection error", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection error"})
		return
	}

	collection := client.Database("Bloggers").Collection("blogs")
	var blog model.Blog

	id, err := primitive.ObjectIDFromHex(data)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	err = collection.FindOne(ctx, bson.M{"_id": id}).Decode(&blog)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, blog)
}
