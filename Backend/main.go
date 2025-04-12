package main

import (
	"blog/Controllers/blog"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/", blog.GetAllBlogs)
	router.POST("/", blog.CreateBlog)
	router.GET("/post/:id", blog.GetBlogById)
	router.Run("0.0.0.0:8000")
}
