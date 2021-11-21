import { React, useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ handleNotification, addBlog }) => {
//author is optional while title and url are mandatory
    const [author, setAuthor] = useState("")
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")

    const handleBlogForm = async (event) => {
        event.preventDefault()
        if(!title||!url){
            handleNotification("Attempt to post blog failed: url or title is missing")
        } else {
            try{
                const blog= !author ? { title, url } : { title, author, url }
                await addBlog(blog)
                setTitle("")
                setAuthor("")
                setUrl("")
            } catch(error) {
                console.log(error)
            }
        }
    }
    return (

        <form onSubmit = {handleBlogForm}>
            <div>
                Title:
                <input
                    id="title"
                    type = "text"
                    value = {title}
                    name = "Title"
                    onChange = {({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                Author:
                <input
                    id="author"
                    type = "text"
                    value = {author}
                    name = "Author"
                    onChange = {({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                Url:
                <input
                    id="url"
                    type = "text"
                    value = {url}
                    name = "Url"
                    onChange = {({ target }) => setUrl(target.value)}
                />
            </div>
            <button id="new-blog-button" type = "submit">create</button>
        </form>
    )}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
}
export default BlogForm