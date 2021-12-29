const initialNotification = ""
let timeoutID= -1

const notificationReducer = (state=initialNotification, action) => {
    switch(action.type) {
    case "SET_NOTIFICATION":
        return action.notification
    case "REMOVE_NOTIFICATION":
        return action.notification
    default:
        return state
    }

}

export const setNotification = (notification, timeout) => {
    return async dispatch => {
        dispatch({
            type:"SET_NOTIFICATION",
            notification
        })
        if(timeoutID>0){
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {dispatch(removeNotification())}, timeout)
    }
}

export const removeNotification = () => {
    return async dispatch => {
        dispatch({
            type:"REMOVE_NOTIFICATION",
            notification:""
        })
    }
}

export default notificationReducer