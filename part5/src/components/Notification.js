import React from "react"

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div id="notification">
            {message}
        </div>
    )
}

export default Notification