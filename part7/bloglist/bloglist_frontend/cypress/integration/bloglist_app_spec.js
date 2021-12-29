describe("Blog app", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        const user = {
            name:"test user",
            username:"test",
            password:"test"
        }
        const admin = {
            name:"admin",
            username:"admin",
            password:"password"
        }
        cy.request("POST", "http://localhost:3003/api/users", user)
        cy.request("POST", "http://localhost:3003/api/users", admin)
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function() {
        cy.contains("username")
        cy.contains("password")
    })

    describe("Login", function () {
        it("succeeds with correct credentials", function() {
            cy.get("#username").type("test")
            cy.get("#password").type("test")
            cy.get("#login-button").click()

            cy.contains("test user logged in")
        })
        it("fails with wrong credentials", function() {
            cy.get("#username").type("test")
            cy.get("#password").type("wrong")
            cy.get("#login-button").click()

            cy.contains("wrong credentials")
        })
    })

    describe("When logged in", function() {
        beforeEach(function() {
            cy.request("POST", "http://localhost:3003/api/login", {
                username:"test", password:"test"
            }).then(response => {
                localStorage.setItem("loggedBloglistAppUser", JSON.stringify(response.body))
                cy.visit("http://localhost:3000")
            })
        })

        it("A blog can be created", function() {
            cy.get("#open-blog-form").click()
            cy.get("#title").type("test title")
            cy.get("#author").type("test author")
            cy.get("#url").type("test url")
            cy.get("#new-blog-button").click()

            cy.contains("test title")
            cy.contains("test author")
        })

        describe("When a blog exists", function() {
            beforeEach(function() {
                cy.createBlog({ title: "new title", author:"new author", url:"new url" })
                cy.get(".blog").contains("view").click()
            })
            it("The blog can be liked", function() {
                cy.get(".blog").contains("likes 0")
                cy.get(".blog").get(".like-button").click()
                cy.get(".blog").contains("likes 1")
            })

            it("The blog can be deleted by the posting user", function () {
                cy.get(".blog").get(".remove-blog-button").click()
                cy.get("#notification").contains("Deleted new title new author")
                cy.get("html").should("not.contain", "new title")
                cy.get("html").should("not.contain", "new author")
            })

            it("The blog can not be deleted by any other user than the posting user", function () {
                cy.get("#logout-button").click()
                cy.get("#username").type("admin")
                cy.get("#password").type("password")
                cy.get("#login-button").click()
                cy.contains("admin logged in")

                cy.get(".blog").contains("view").click()
                cy.get("#notification").should("not.contain", "Deleted new title new author")
                cy.get(".blog").should("not.contain", "remove")
            })

        })

        describe.only("When multiple blogs exist", function() {
            beforeEach(function() {
                cy.visit("http://localhost:3000")

                cy.createBlog({ title: "First Blog", author:"New Author", url:"newurl.com", likes:2 })
                cy.createBlog({ title: "Second Blog", author:"New Author", url:"newurl.com", likes:5 })
                cy.createBlog({ title: "Third Blog", author:"New Author", url:"newurl.com", likes:10 })
                cy.createBlog({ title: "Fourth Blog", author:"New Author", url:"newurl.com", likes:23 })
                cy.createBlog({ title: "Fifth Blog", author:"New Author", url:"newurl.com", likes:4 })
            })

            it("Blogs are sorted by their likes", function() {
                cy.get(".blog").then((blogs) => {
                    cy.wrap(blogs[0]).should("contain", "Fourth Blog")
                    cy.wrap(blogs[1]).should("contain", "Third Blog")
                    cy.wrap(blogs[2]).should("contain", "Second Blog")
                    cy.wrap(blogs[3]).should("contain", "Fifth Blog")
                    cy.wrap(blogs[4]).should("contain", "First Blog")
                })
            })
        })
    })
})