let initialBlog={
    author:"",
    url:"",
    title:"",
    likes:0,
    expanded:false
}
const blogReducer = (state=initialBlog, action) => {
    switch(action.type) {
    case "SET_URL":
        return action.blog
    case "SET_TITLE":
        return action.blog
    case "SET_AUTHOR":
        return action.blog
    case "RESET":
        return initialBlog

    default:
        return state
    }

}

export const setUrl = (state, url) => {
    const blog = { ...state, url }
    return async dispatch => {
        dispatch({
            type:"SET_URL",
            blog
        })

    }
}
export const setAuthor = (state, author) => {
    const blog = { ...state, author }

    return async dispatch => {
        dispatch({
            type:"SET_AUTHOR",
            blog
        })

    }
}
export const setTitle = (state, title) => {
    const blog = { ...state, title }

    return async dispatch => {
        dispatch({
            type:"SET_TITLE",
            blog
        })

    }
}


export const resetBlogForm = () => {
    return async dispatch => {
        dispatch({
            type:"RESET"
        })

    }
}


export default blogReducer