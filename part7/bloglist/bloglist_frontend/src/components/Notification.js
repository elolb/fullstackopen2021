import React from "react"
import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"
const Notification = () => {
    const message = useSelector(state => state.notification)
    if (!message) {
        return null
    }

    return (
        <Alert id="notification">
            {message}
        </Alert>
    )
}

export default Notification