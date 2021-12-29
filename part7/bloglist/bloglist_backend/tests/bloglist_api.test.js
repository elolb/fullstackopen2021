const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

test("correct number of blogs are returned", async() => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})
test("blogs are returned as JSON", async() => {
    await api
    .get("/api/blogs")
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test("unique identifier has name 'id'", async() => {
    const result = await api.get("/api/blogs")
    expect(result.body[0].id).toBeDefined()
})

test("a new blog gets successfully created", async() => {
    const expected = {
        "title": "New blog post",
        "author": "Michael Chan",
    }
    const user = await User.findOne({ username: helper.initialUsers[0].username })
    
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    await api.post("/api/blogs") 
        .send({
        "title": "New blog post",
        "author": "Michael Chan",
        "url": "https://new.com/",
        "likes":3
      })
        .set('Authorization', `bearer ${token}`)

    const response = await api.get("/api/blogs")
    const contents = response.body.map(r => { 
       return {"title": r.title,
        "author": r.author}
    })
    expect(response.body).toHaveLength(helper.initialBlogs.length+1)
    expect(contents).toContainEqual(expected)
},10000000)

test("if likes is missing from request it will default to 0", async () => {
    const expected = {
        "title": "No likes",
        "author": "Author",
        "likes": 0
    }
    
    const user = await User.findOne({ username: helper.initialUsers[0].username })
    
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    await api.post("/api/blogs") 
        .send({
        "title": "No likes",
        "author": "Author",
        "url": "https://newlike.com/",
        })
        .set('Authorization', `bearer ${token}`)
    const response = await api.get("/api/blogs")
    const contents = response.body.map(r => { 
       return {"title": r.title,
        "author": r.author,
        "likes": r.likes}
    })
    expect(contents).toContainEqual(expected)
})

test("if title and url are missing respond with 400", async() => {

    const user = await User.findOne({ username: helper.initialUsers[0].username })
    
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    await api.post("/api/blogs") 
        .send({
        "author": "Author",
        "likes":5
    })
    .set('Authorization', `bearer ${token}`)
    .expect(400)
})
afterAll(() => {
    mongoose.connection.close()
  })