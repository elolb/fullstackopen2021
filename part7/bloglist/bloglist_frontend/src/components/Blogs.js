import { React, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import blogService from "../services/blogs"
import { updateBlogs } from "../reducers/usersReducer"
import { Link } from "react-router-dom"
import { newBlog } from "../reducers/blogsReducer"
import { Table } from "react-bootstrap"

const Blogs = ({ handleNotification }) => {
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)

    const dispatch = useDispatch()

    const addBlog = async (newObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            const blog = await blogService.create(newObject)
            dispatch(newBlog(blogs, blog, user.username))
            dispatch(updateBlogs(users, user, blog))
            handleNotification(`New blog added: ${newObject.title} ${newObject.author}`)
        }  catch (error) {
            handleNotification(error.message)
        }
    }

    const blogList = () => (
        <Table striped>
            <tbody>
                {blogs.sort((blog, nextBlog) => nextBlog.likes-blog.likes)
                    .map(blog =>
                        <tr key={blog.id}>
                            <td>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </td>
                        </tr>
                    )}
            </tbody>
        </Table>
    )
    const blogFormRef = useRef()

    return(
        <div>
            <h2 style={{ padding:15 }}>Blogs</h2>

            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm addBlog={addBlog}></BlogForm>
            </Togglable>

            {blogList()}

        </div>
    )}
export default Blogs