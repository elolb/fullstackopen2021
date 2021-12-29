import React, { useEffect } from "react"
import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Notification from "./components/Notification"
import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import Users from "./components/Users"
import User from "./components/User"
import blogService from "./services/blogs"
import userService from "./services/users"
import { setNotification } from "./reducers/notificationReducer"
import { setBlogs } from "./reducers/blogsReducer"
import { setUser, resetUser } from "./reducers/userReducer"
import { setUsers } from "./reducers/usersReducer"
import { Button, Navbar, Nav } from "react-bootstrap"

const App = () => {
    const padding = {
        padding: 5
    }
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            dispatch(setBlogs(blogs))
        )
    }, [])

    useEffect(() => {
        userService.getAll().then(users =>
            dispatch(setUsers(users))
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBloglistAppUser")
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [])

    const handleNotification = (message) => {
        dispatch(setNotification(message, 4000))
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        window.localStorage.removeItem("loggedBloglistAppUser")
        blogService.setToken(null)
        dispatch(resetUser())
        handleNotification("Logged out")
        dispatch(setBlogs([]))
    }

    return (
        <div className="container">
            <Router>
                {user.token ?
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="container-fluid">
                                <Navbar.Brand as={Link} to="/" style={{ padding:15 }}>Bloglist App</Navbar.Brand>
                                <Nav.Link className="ml-auto" href="#" as="span">
                                    <Link style={padding} to="/">blogs</Link>
                                </Nav.Link>
                                <Nav.Link href="#" as="span">
                                    <Link style={padding} to="/users">users</Link>
                                </Nav.Link>
                            </Nav>
                            <Nav className="justify-content-end">
                                <Nav.Item >
                                    <p style={{ display:"inline-block", color:"whitesmoke", padding:5 }}>{user.name} logged in</p>
                                </Nav.Item>
                                <Nav.Item>
                                    <Button id="logout-button" variant="danger" style={padding} onClick={handleLogout}>logout</Button>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    : <></>
                }


                <div>
                    <Notification/>

                    { user.token
                        ?
                        <Routes>
                            <Route path="/users/:id"
                                element={<User/>}>
                            </Route>
                            <Route path="/users/*"
                                element={<Users/>}>
                            </Route>
                            <Route path="/blogs/:id"
                                element={<Blog user={user} handleNotification={handleNotification}/>}>
                            </Route>
                            <Route path="/"
                                element={<Blogs handleNotification={handleNotification}/>}>
                            </Route>
                        </Routes>
                        : <div>
                            <h2><i>Blogs App</i></h2>
                            <LoginForm handleNotification={handleNotification}/>
                        </div>
                    }
                </div>
            </Router>
        </div>
    )
}

export default App