let initialUser = {
    username:"",
    password:"",
}

const userReducer = (state = initialUser, action) => {
    switch(action.type) {
    case "SET_USERNAME":
        return action.user
    case "SET_PASSWORD":
        return action.user
    case "SET_USER":
        return action.user
    case "SET_LOGGED_IN_USER":
        return action.user
    case "RESET_USER":
        return initialUser
    default:
        return state
    }

}

export const setUsername = (state, username) => {
    const user = { ...state, username }
    return async dispatch => {
        dispatch({
            type:"SET_USERNAME",
            user
        })

    }
}
export const setPassword = (state, password) => {
    const user = { ...state, password }

    return async dispatch => {
        dispatch({
            type:"SET_PASSWORD",
            user
        })

    }
}
export const setUser = (user) => {

    return async dispatch => {
        dispatch({
            type:"SET_USER",
            user
        })

    }
}
export const setLoggedInUser = (user) => {

    return async dispatch => {
        dispatch({
            type:"SET_LOGGED_IN_USER",
            user
        })

    }
}


export const resetUser = () => {
    return async dispatch => {
        dispatch({
            type:"RESET_USER"
        })

    }
}


export default userReducer