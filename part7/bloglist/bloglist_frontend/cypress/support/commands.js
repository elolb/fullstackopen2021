Cypress.Commands.add("createBlog", ({ title, url, author, likes }) => {
    cy.request({
        url: "http://localhost:3003/api/blogs",
        method: "POST",
        body: { title, url, author, likes },
        headers: {
            "Authorization": `bearer ${JSON.parse(localStorage.getItem("loggedBloglistAppUser")).token}`
        }
    })

    cy.visit("http://localhost:3000")
})