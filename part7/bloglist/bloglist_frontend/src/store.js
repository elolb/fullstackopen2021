import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import notificationReducer from "./reducers/notificationReducer"
import { composeWithDevTools } from "redux-devtools-extension"
import blogsReducer from "./reducers/blogsReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import usersReducer from "./reducers/usersReducer"
import commentsReducer from "./reducers/commentsReducer"
import commentReducer from "./reducers/commentReducer"

const reducer = combineReducers({
    blogs: blogsReducer,
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer,
    users: usersReducer,
    comments: commentsReducer,
    comment: commentReducer
})

const store = createStore(reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    ))

export default store
