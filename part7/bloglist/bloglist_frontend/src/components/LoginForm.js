import { React } from "react"
import { setUsername, setPassword } from "../reducers/userReducer"
import loginService from "../services/login"
import { setLoggedInUser } from "../reducers/userReducer"
import { useDispatch, useSelector } from "react-redux"
import blogService from "../services/blogs"
import { setBlogs } from "../reducers/blogsReducer"
import { Form, Button } from "react-bootstrap"
const LoginForm = ({ handleNotification }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            console.log(user)
            const userToLogin = await loginService.login({ username: user.username, password: user.password })
            window.localStorage.setItem("loggedBloglistAppUser", JSON.stringify(userToLogin))
            blogService.setToken(userToLogin.token)
            dispatch(setLoggedInUser(userToLogin))

            blogService.getAll().then(blogs =>
                dispatch(setBlogs(blogs))
            )
        } catch (exception) {
            handleNotification("wrong credentials")
        }
    }
    const loginForm = () => (
        <Form id="login-form" onSubmit = {handleLogin}>
            <Form.Group>
                <Form.Label>username</Form.Label>
                <Form.Control
                    id="username"
                    type = "text"
                    name = "Username"
                    onChange = {({ target }) => dispatch(setUsername(user, target.value))}
                />
                <Form.Label>password</Form.Label>
                <Form.Control
                    id="password"
                    type = "password"
                    name = "Password"
                    onChange = {({ target }) => dispatch(setPassword(user, target.value))}
                />
                <Button id="login-button" variant="primary" type = "submit">login</Button>
            </Form.Group>
        </Form>
    )

    return(
        <div>
            <h2>Log in to application</h2>
            {loginForm()}
        </div>
    )


}

export default LoginForm
