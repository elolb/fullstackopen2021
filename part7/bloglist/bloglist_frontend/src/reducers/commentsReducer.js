const commentsReducer = (state = [], action) => {
    switch (action.type) {
    case "SET_COMMENTS":
        return action.comments
    case "ADD_COMMENT":
        return action.updatedState
    default:
        return state
    }
}

export const setComments = (comments) => {
    return async dispatch => {
        dispatch({
            type: "SET_COMMENTS",
            comments
        })
    }
}

export const addComment = (comments, comment) => {
    const updatedState = comments.concat({ ...comment })
    return async dispatch => {
        dispatch({
            type: "ADD_COMMENT",
            updatedState
        })
    }
}

export default commentsReducer