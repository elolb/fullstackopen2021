import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "./BlogForm"

const form = {
    title: "example form",
    author: "somebody",
    url: ".com"
}

test("event handler is called with the right details when new blog is created", () => {
    const addBlog = jest.fn()
    const component = render(
        <BlogForm addBlog={addBlog}/>
    )
    const title = component.container.querySelector("#title")
    const author = component.container.querySelector("#author")
    const url = component.container.querySelector("#url")

    const formComponent = component.container.querySelector("form")

    fireEvent.change(title, {
        target: { value: form.title }
    })

    fireEvent.change(url, {
        target: { value: form.url }
    })

    fireEvent.change(author, {
        target: { value: form.author }
    })

    fireEvent.submit(formComponent)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toEqual(form.title)
    expect(addBlog.mock.calls[0][0].author).toEqual(form.author)
    expect(addBlog.mock.calls[0][0].url).toEqual(form.url)
})