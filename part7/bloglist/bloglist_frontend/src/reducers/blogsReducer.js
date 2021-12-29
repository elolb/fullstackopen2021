
const blogsReducer = (state=[], action) => {
    switch(action.type) {
    case "SET_BLOGS":
        return action.blogs
    case "REMOVE_BLOG":
        return action.updatedList
    case "NEW_BLOG":
        return action.updatedList
    case "SET_LIKES":
        return action.updatedList
    case "SET_EXPANDED":
        return action.updatedList
    default:
        return state
    }

}

export const setBlogs = (blogs) => {

    return async dispatch => {
        dispatch({
            type:"SET_BLOGS",
            blogs
        })

    }
}

export const newBlog = (blogs, blog, username) => {
    const updatedList = blogs.concat({ ...blog, username })
    return async dispatch => {
        dispatch({
            type:"NEW_BLOG",
            updatedList
        })
    }
}

export const removeBlog = (blogs, id) => {
    const updatedList = blogs.filter(blogInList => blogInList.id!==id)
    return async dispatch => {
        dispatch({
            type:"REMOVE_BLOG",
            updatedList
        })
    }
}

export const setLikes = (blogs, id) => {
    const updatedList = blogs.map(blogInList => blogInList.id!==id ? blogInList : { ...blogInList, likes: blogInList.likes+1 })
    return async dispatch => {
        dispatch({
            type:"SET_LIKES",
            updatedList
        })
    }
}
export const setExpanded = (blogs, blogId, expanded) => {
    const updatedList = blogs.map(blog => blog.id!== blogId ? blog : { ...blog, expanded })
    return async dispatch => {
        dispatch({
            type:"SET_EXPANDED",
            updatedList
        })

    }
}
export default blogsReducer