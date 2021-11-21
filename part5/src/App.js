import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"
const App = () => {
    const [message, setMessage] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBloglistAppUser")
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleNotification = (message) => {
        setMessage(message)
        setTimeout(() => {setMessage(null)}, 4000)
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem("loggedBloglistAppUser", JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
            blogService.getAll().then(blogs =>
                setBlogs(blogs)
            )
        } catch (exception) {
            handleNotification("wrong credentials")
        }
    }
    const handleLogout = async (event) => {
        event.preventDefault()
        window.localStorage.removeItem("loggedBloglistAppUser")
        blogService.setToken(null)
        setUser(null)
        handleNotification("Logged out")
        setBlogs([])
    }
    const handleLike= async(blog, setLikes, likes) => {
        try{
            await blogService.like(blog)
            setLikes(likes+1)
            blog.likes+=1
            setBlogs(blogs.map(blogInList => blogInList.id===blog.id ? blog : blogInList))
        } catch(error){
            handleNotification(error.message)
        }
    }

    const addBlog = async (newObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            const blog = await blogService.create(newObject)
            setBlogs(blogs.concat(blog))
            handleNotification(`New blog added: ${newObject.title} ${newObject.author}`)
        }  catch (error) {
            handleNotification(error.message)
        }
    }

    const loginForm = () => (
        <form id="login-form" onSubmit = {handleLogin}>
            <div>
        username
                <input
                    id="username"
                    type = "text"
                    value = {username}
                    name = "Username"
                    onChange = {({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
        password
                <input
                    id="password"
                    type = "password"
                    value = {password}
                    name = "Password"
                    onChange = {({ target }) => setPassword(target.value)}
                />
            </div>
            <button id="login-button" type = "submit">login</button>
        </form>
    )

    const blogFormRef = useRef()

    if ( user === null) {
        return(
            <div>
                <Notification message={message}/>
                <h2>Log in to application</h2>
                {loginForm()}
            </div>
        )
    }
    return (
        <div>
            <Notification message={message}/>
            <h2>Blogs</h2>
            <p style={{ display:"inline-block" }}>{user.name} logged in</p><button id="logout-button" onClick={handleLogout}>logout</button>
            <h2>Create New</h2>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm handleNotification={handleNotification} addBlog={addBlog}></BlogForm>
            </Togglable>

            {blogs.sort((blog, nextBlog) => nextBlog.likes-blog.likes)
                .map(blog =>
                    <Blog key={blog.id} user={user} blog={blog} blogs={blogs} setBlogs={setBlogs} handleLike={handleLike} handleNotification={handleNotification}/>)
            }
        </div>
    )
}

export default App