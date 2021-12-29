
const usersReducer = (state=[], action) => {

    switch(action.type) {
    case "SET_USERS":
        return action.users
    case "UPDATE_BLOGS":
        return action.updatedUsers
    default:
        return state
    }
}

export const setUsers = (users) => {
    return async dispatch => {
        dispatch({
            type:"SET_USERS",
            users
        })
    }
}
export const updateBlogs = (state, bloggingUser, blog) => {
    // eslint-disable-next-line no-unused-vars
    const { user, ...blogWithoutUser } = blog
    const updatedBlogs=state.filter(user => user.username===bloggingUser.username)[0].blogs.concat(blogWithoutUser)
    const updatedUsers = state.map(user => !(user.username===bloggingUser.username) ? user : { ...user, blogs:updatedBlogs })

    return async dispatch => {
        dispatch({
            type:"UPDATE_BLOGS",
            updatedUsers
        })
    }
}
export default usersReducer