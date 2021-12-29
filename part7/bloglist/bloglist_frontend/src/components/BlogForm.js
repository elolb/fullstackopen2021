import { React } from "react"
import PropTypes from "prop-types"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import { setTitle, setAuthor, setUrl, resetBlogForm } from "../reducers/blogReducer"
import { Form, Button } from "react-bootstrap"

const BlogForm = ({ addBlog }) => {
    const dispatch = useDispatch()
    const blog = useSelector(state => state.blog)
    //author is optional while title and url are mandatory

    const handleBlogForm = async (event) => {
        event.preventDefault()
        if(!blog.title||!blog.url){
            dispatch(setNotification("Attempt to post blog failed: url or title is missing", 4000))
        } else {
            try{
                await addBlog(blog)
                dispatch(resetBlogForm())
            } catch(error) {
                console.log(error)
            }
        }
    }
    return (

        <Form onSubmit = {handleBlogForm} style={{ display:"inline-block" }}>
            <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                    id="title"
                    type = "text"
                    value = {blog.title}
                    name = "Title"
                    onChange = {({ target }) => dispatch(setTitle(blog,target.value))}
                />
                <Form.Label>Author:</Form.Label>
                <Form.Control
                    id="author"
                    type = "text"
                    value = {blog.author}
                    name = "Author"
                    onChange = {({ target }) => dispatch(setAuthor(blog,target.value))}
                />
                <Form.Label>Url:</Form.Label>
                <Form.Control
                    id="url"
                    type = "text"
                    value = {blog.url}
                    name = "Url"
                    onChange = {({ target }) => dispatch(setUrl(blog,target.value))}
                />
                <Button id="new-blog-button" variant="primary" type="submit" style={{ display:"inline-block" }}>create</Button>
            </Form.Group>
        </Form>
    )}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
}
export default BlogForm