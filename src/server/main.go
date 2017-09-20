package main

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

func reactBuildMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		path := c.Request.URL.Path
		reload := false
		if strings.HasSuffix(path, ".map") {
		    fmt.Println(path)
			c.Status(404)
			c.Abort()
			return
		}
		requestJsFile := strings.HasSuffix(path, ".js")
		requestBuildFile := strings.HasPrefix(path, "/public/") || strings.HasPrefix(path, "/static/")
		if _, err := os.Stat("./build" + path); err == nil {
			if requestBuildFile {
				c.Next()
				return
			}
		} else {
			// 如果./build/public目录下文件缺失，说明重新部署了，需要reload
			reload = strings.HasPrefix(path, "/public/") && requestJsFile
			if !requestJsFile && requestBuildFile {
				c.Status(404)
				c.Abort()
				return
			}
		}
		fileToServe := "./build/public/index.html"
		if path == "/favicon.ico" {
			fileToServe = "./build/public/favicon.ico"
		}
		if reload {
			fmt.Println("强制加载整个页面")
			fileToServe = "./build/static/reload.js"
		}
		f, err := os.Open(fileToServe)
		if err == nil {
			c.Status(200)
			defer f.Close()
			io.Copy(c.Writer, f)
		} else {
			c.Status(404)
		}
		c.Abort()
	}
}

func main() {
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))

	if err != nil {
		os.Exit(-1)
	}
	err = os.Chdir(dir)
	if err != nil {
		os.Exit(-1)
	}

	r := gin.Default()
	r.Use(reactBuildMiddleware())
	r.Static("/", "./build")

	r.Run(":3000")
}
