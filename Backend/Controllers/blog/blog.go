package blog

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func CreateBlog(c *gin.Context) {
	data := c.Request.Body
	fmt.Println(data, "Data")
}
func GetAllBlogs(c *gin.Context) {}
func GetBlogById(c *gin.Context) {
	data := c.Param("id")
	fmt.Print("data", data)
}
