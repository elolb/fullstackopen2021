import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

const blog = {
    title: "Component testing is done with react-testing-library",
    url:"test.com",
    author:"admin",
    likes:5,
    user:[{ username:"admin"
    }]
}
const user = {
    username:"admin"
}

test("renders title and author, but does not initially render url or likes ", () => {
    const component = render(
        <Blog blog={blog} user={user}></Blog>
    )

    expect(component.container).toHaveTextContent(
        "Component testing is done with react-testing-library"
    )
    expect(component.container).not.toHaveTextContent("test.com")
    expect(component.container).not.toHaveTextContent("likes")
})

test("url and likes are shown when the view button is clicked", () => {
    const component = render(
        <Blog blog={blog} user={user}></Blog>
    )
    const button = component.container.querySelector(".view")
    fireEvent.click(button)
    expect(component.container).toHaveTextContent("test.com")
    expect(component.container).toHaveTextContent("likes")
})

test("if like button is clicked twice event handler is called twice", () => {
    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} handleLike={mockHandler}></Blog>
    )
    const viewButton = component.container.querySelector(".view")
    fireEvent.click(viewButton)
    const likeButton = component.container.querySelector(".likeButton")
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})
