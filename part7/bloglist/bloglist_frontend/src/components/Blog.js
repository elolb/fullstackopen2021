import { React, useEffect } from "react"
import blogService from "../services/blogs"
import { useDispatch, useSelector } from "react-redux"
import { setBlogs, setLikes, removeBlog  } from "../reducers/blogsReducer"
import { setComments, addComment } from "../reducers/commentsReducer"
import { setComment } from "../reducers/commentReducer"
import { useParams } from "react-router-dom"
import { Button, Form } from "react-bootstrap"

const Blog = ({ user,  handleNotification }) => {
    const dispatch = useDispatch()
    const id = useParams().id
    const blogs = useSelector(state => state.blogs)
    const blog = useSelector(state => state.blogs).filter(blog => blog.id===id)[0]
    const blogId= blog? blog.id : null

    useEffect(() => {
        blogService.getComments(blogId).then(comments =>
            dispatch(setComments(comments))
        )
    }, [blog])


    const comments = useSelector(state => state.comments)
    const comment = useSelector(state => state.comment)
    if(!blog){
        return null
    }


    const handleLike= async(blog) => {
        try{
            await blogService.like(blog)
            dispatch(setLikes(blogs, blog.id))
            blog.likes+=1
            dispatch(setBlogs(blogs.map(blogInList => blogInList.id===blog.id ? blog : blogInList)))
            handleNotification(`Liked blog ${blog.title} ${blog.author}`)

        } catch(error){
            handleNotification(error.message)
        }
    }

    const handleDelete = () => {
        if(window.confirm(`Are you sure you want to delete blog? ${blog.title} ${blog.author}`)){
            try {
                blogService.deleteOne(blog.id)
                dispatch(removeBlog(blogs, blog.id))
                handleNotification(`Deleted ${blog.title} ${blog.author}`)
            } catch (error){
                handleNotification(error.message)
            }
        }
    }
    const deleteButton = () => {
        const blogPoster = blog.user[0].username
        return (blogPoster===user.username || blog.username===user.username ?
            <Button className="remove-blog-button" style={{ display:"block" }} onClick={handleDelete}>remove</Button>
            : <></>
        )
    }

    const commentList = () => {
        return <ul>{comments.map(comment => <li key= {comment.id}>{comment.content}</li>)}</ul>
    }

    const handleCommentForm = async (event) => {
        event.preventDefault()
        if(!comment){
            handleNotification("Comment can not be empty", 4000)
        } else {
            try{
                const addedComment= await blogService.addComment(id, comment)
                dispatch(addComment(comments, addedComment))
                handleNotification(`New comment added: ${comment}`)
                dispatch(setComment(""))
            } catch(error){
                console.log(error)
            }
        }
    }

    const commentForm = () => (
        <Form onSubmit = {handleCommentForm}>
            <Form.Control
                style={{ display:"inline-block" }}
                id="comment"
                type = "text"
                value = {comment}
                name = "Comment"
                onChange = {({ target }) => dispatch(setComment(target.value))}
            />
            <Button id="new-blog-button" type = "submit">add comment</Button>
        </Form>
    )

    return(
        <div>
            <h2>{blog.title} {blog.author}</h2>
            <a href={blog.url}>{blog.url}</a>
            <p className="likes" style={{ display:"block" }}>{blog.likes} likes</p>
            <Button className="like-button" onClick={() => handleLike(blog)}>like</Button>
            <p>added by {blog.user[0].name}</p>
            {deleteButton()}
            <h3>comments</h3>
            {commentForm()}
            {comments ? commentList() : <></>}
        </div>
    )
}

export default Blog