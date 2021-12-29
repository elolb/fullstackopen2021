const commentReducer = (state = "", action) => {
    switch (action.type) {
    case "SET_COMMENT":
        return action.comment
    default:
        return state
    }
}

export const setComment = (comment) => {
    return async dispatch => {
        dispatch({
            type: "SET_COMMENT",
            comment
        })

    }
}

export default commentReducer