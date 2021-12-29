import React, { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"

const Togglable = React.forwardRef((props, ref) => {
    const[visible, setVisible] = useState(false)

    const hideWhenVisible = { display:visible ? "none" : "" }
    const showWhenVisible = { display:visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button id="open-blog-form" onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button id="close-blog-form" variant="secondary" onClick={toggleVisibility} style={{ display:"inline-block" }}>cancel</Button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = "Togglable"
export default Togglable