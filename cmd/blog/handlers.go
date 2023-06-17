package main

import (
	"fmt"
	"strings"
	"html/template"
	"log"
	"net/http"
	"io"
	"os"
	"encoding/base64"
	"encoding/json"
	"time"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type indexPageData struct {
	Title           string
	Subtitle        string
	FeaturedPosts   []featuredPostData
	MostRecentPosts []mostrecentPostData
}

type featuredPostData struct {
	PostID        int    `db:"post_id"`
	Title         string `db:"title"`
	Subtitle      string `db:"subtitle"`
	PreviewImageAlt string `db:"preview_image_alt"`
	PreviewImageSrc string `db:"preview_image_src"`
	AuthorName    string `db:"author_name"`
	AuthorImgSrc  string `db:"author_img_src"`
	PublishDate   string `db:"publish_date"`
	Feature       string `db:"feature"`
	FeatureColor  string `db:"feature_color"`
	PostURL       string
}

type mostrecentPostData struct {
	PostID        int    `db:"post_id"`
	Title         string `db:"title"`
	Subtitle      string `db:"subtitle"`
	PreviewImageAlt string `db:"preview_image_alt"`
	PreviewImageSrc string `db:"preview_image_src"`
	AuthorName    string `db:"author_name"`
	AuthorImgSrc  string `db:"author_img_src"`
	PublishDate   string `db:"publish_date"`
	PostURL       string
}

type postData struct {
	Title         string `db:"title"`
	Subtitle      string `db:"subtitle"`
	BackgroundAlt string `db:"background_alt"`
	BackgroundSrc string `db:"background_src"`
	Content       string `db:"content"`
}

type adminPageData struct {
	LogoImageURL   string
	UserPhotoURL   string
	CameraIconURL  string
	TrashIconURL   string
	LogOutIcon24px string
	AlertIconURL   string
	CheckIconURL   string
}

type loginPageData struct {
	LogoImageURL       string
	PasswordEyeOn      string
	PasswordEyeOff     string
	BackgroundImageURL string
	AlertIconURL       string
}

func index(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		fetured_Posts, err := featuredPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		mostrecent_Posts, err := mostrecentPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		ts, err := template.ParseFiles("pages/index.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		data := indexPageData{
			Title:           "Let's do it together.",
			Subtitle:        "We travel the world in search of stories. Come along for the ride.",
			FeaturedPosts:   fetured_Posts,
			MostRecentPosts: mostrecent_Posts,
		}

		err = ts.Execute(w, data)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		log.Println("index.html Request completed successfully")
	}
}

func featuredPosts(db *sqlx.DB) ([]featuredPostData, error) {
	const query = `
		SELECT
			post_id,
			title,
			subtitle,
			preview_image_alt,
			preview_image_src,
			author_name,
			author_img_src,
			publish_date,
			feature,
			feature_color
		FROM
			post
		WHERE featured = 1
	`
	var posts []featuredPostData

	err := db.Select(&posts, query)

	if err != nil {
		return nil, err
	}

	for index, post := range posts {
		posts[index].PostURL = fmt.Sprintf("/post/%d", post.PostID)
	}

	return posts, nil
}

func mostrecentPosts(db *sqlx.DB) ([]mostrecentPostData, error) {
	const query = `
		SELECT
			post_id,
			title,
			subtitle,
			preview_image_alt,
			preview_image_src,
			author_name,
			author_img_src,
			publish_date
		FROM
			post
		WHERE featured = 0
	`

	var posts []mostrecentPostData

	err := db.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	for index, post := range posts {
		posts[index].PostURL = fmt.Sprintf("/post/%d", post.PostID)
	}

	return posts, nil
}

func post(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		tmpl, err := template.ParseFiles("pages/post.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}
		postID := mux.Vars(r)["postID"]
		query := fmt.Sprintf(`
			SELECT
				title,
				subtitle,
				background_alt,
				background_src,
				content
			FROM
				post
			WHERE post_id = %s
		`, postID)

		var posts []postData

		err = db.Select(&posts, query)
		if err != nil {
			return
		}

		data := postData{
			Title:         posts[0].Title,
			Subtitle:      posts[0].Subtitle,
			BackgroundAlt: posts[0].BackgroundAlt,
			BackgroundSrc: posts[0].BackgroundSrc,
			Content:       posts[0].Content,
		}

		err = tmpl.Execute(w, data)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}
		log.Println("post.html Request completed successfully")
	}
}

func admin(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("pages/admin.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}

	data := adminPageData {
		LogoImageURL:   "static/images/escape_author_white.svg",
		UserPhotoURL:   "static/images/avatar.svg",
		CameraIconURL:  "static/images/camera_icon.svg",
		TrashIconURL:   "static/images/trash-icon.svg",
		LogOutIcon24px: "static/images/log_out_24px.svg",
		AlertIconURL:   "static/images/alert_circle.svg",
		CheckIconURL:   "static/images/check_circle.svg",
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}
	log.Println("post.html Request completed successfully")
}


type newPostData struct {
	Title              string
	ShortDescription   string
	AuthorName         string
	AuthorPhotoURL     string
	AuthorPhotoName    string
	PublishDate        string
	LargeHeroImageURL  string
	LargeHeroImageName string
	SmallHeroImageURL  string
	SmallHeroImageName string
	Content            string
}


func savePhoto(base64URL string, photoName string) (error) {
	photo, err := base64.StdEncoding.DecodeString(strings.Split(base64URL, ",")[1])
	if err != nil {
		log.Println(err.Error())
		return err
	}

	photoFile, err := os.Create("static/images/" + photoName)
	if err != nil {
		log.Println(err.Error())
		return err
	}
	_, err = photoFile.Write(photo)
	if err != nil {
		log.Println(err.Error())
		return err
		
	}
	return nil
}

func insertPost(db *sqlx.DB, post newPostData) error {
	const query = `
		INSERT INTO
			post
			(
				title,
				subtitle,
				preview_image_alt,
				preview_image_src,
				background_alt,
				background_src,
				author_name,
				author_img_src,
				publish_date,
				content
			)
		VALUES
			(
				?,
				?,
				?,
				CONCAT('static/images/', ?),
				?,
				CONCAT('static/images/', ?),
				?,
				CONCAT('static/images/', ?),
				?,
				?
			)
	`
	_, err := db.Exec(query, post.Title, post.ShortDescription, post.Title, post.SmallHeroImageName, post.Title, post.LargeHeroImageName, post.AuthorName, post.AuthorPhotoName, post.PublishDate, post.Content)
	return err
}

func createPost(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		err := authByCookie(db, w, r)
		if err != nil {
			http.Error(w, "User is not registered", 500)
			log.Println(err.Error())
			return
		}
		w.WriteHeader(200)
		reqData, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Parsing error", 500)
			log.Println(err.Error())
			return
		}

        var post newPostData
        err = json.Unmarshal(reqData, &post)
        if err != nil {
            http.Error(w, "JSON parsing error", 500)
            log.Println(err.Error())
            return
        }

		savePhoto(post.AuthorPhotoURL, post.AuthorPhotoName)
		if err != nil {
			http.Error(w, "Save error", 500)
			log.Println(err.Error())
			return
		}
		savePhoto(post.LargeHeroImageURL, post.LargeHeroImageName)
		if err != nil {
			http.Error(w, "Save error", 500)
			log.Println(err.Error())
			return
		}
		savePhoto(post.SmallHeroImageURL, post.SmallHeroImageName)
		if err != nil {
			http.Error(w, "Save error", 500)
			log.Println(err.Error())
			return
		}
		err = insertPost(db, post)
		if err != nil {
			http.Error(w, "Insert post error", 500)
			log.Println(err.Error())
			return
		}
		log.Println("Posting ", post.Title, " completed successfully")
	}
}

func login(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("pages/login.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}

	data := loginPageData {
		LogoImageURL: "static/images/escape_white.svg",   
		PasswordEyeOn: "static/images/password_eye_on.svg",
		PasswordEyeOff: "static/images/password_eye_off.svg",
		BackgroundImageURL: "static/images/login-background.png",
		AlertIconURL:   "static/images/alert_circle.svg",
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}
	log.Println("login.html Request completed successfully")
}



type userAuthData struct {
	Email    string
	Password string
}

func searchUser(db *sqlx.DB, auth userAuthData) (string, error) {
	const query = `
		SELECT
			user_id,
			email,
			password
		FROM
			user
		WHERE
			email = ? AND
			password = ?
	`
	row := db.QueryRow(query, auth.Email, auth.Password)
	type userDataBase struct {
		UserID   string
		Email    string
		Password string
	}
	user := new(userDataBase)
	err := row.Scan(&user.UserID, &user.Email, &user.Password)
	if err != nil {
		return "", err
	}

	return user.UserID, nil
}

func userLogIn(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		reqData, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Parsing error", 500)
			log.Println(err.Error())
			return
		}

		var auth userAuthData

		err = json.Unmarshal(reqData, &auth)
		if err != nil {
			http.Error(w, "JSON parsing error", 500)
			log.Println(err.Error())
			return
		}

		userID, err := searchUser(db, auth)
		if err != nil {
			const errCode = 401
			http.Error(w, "Incorect email or password", errCode)
			log.Println("Incorect email or password")
			return
		}

		http.SetCookie(w, &http.Cookie{
			Name:    "authCookieName",
			Value:   fmt.Sprint(userID),
			Path:    "/",
			Expires: time.Now().AddDate(0, 0, 1),
		})
		w.WriteHeader(200)

	}
}

func authByCookie(db *sqlx.DB, w http.ResponseWriter, r *http.Request) error {
	cookie, err := r.Cookie("authCookieName")
	if err != nil {
		if err == http.ErrNoCookie {
			http.Error(w, "No auth cookie passed", 401)
			log.Println(err)
			return err
		}
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return err
	}
 
 
	userIDStr := cookie.Value
	err = checkUser(db, userIDStr)
	if err != nil {
		http.Error(w, "No such user", 401)
		log.Println(err)
		return err
	}

	return nil
 }
 
 func checkUser(db *sqlx.DB, userID string) (error) {
	const query = `
		SELECT
			user_id,
			email,
			password
		FROM
			user
		WHERE
			user_id = ?
	`
	row := db.QueryRow(query, userID)
	type userDataBase struct {
		UserID   string
		Email    string
		Password string
	}
	user := new(userDataBase)
	err := row.Scan(&user.UserID, &user.Email, &user.Password)
	if err != nil {
		return err
	}

	return nil
}

func clearCookie(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		http.SetCookie(w, &http.Cookie{
			Name:    "authCookieName",
			Path:    "/",
			Expires: time.Now().AddDate(0, 0, -1),
		})
		log.Println("Cookie is deleted")
	}
}