const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require("../models/user")
const Comment = require("../models/comment")
const jwt = require("jsonwebtoken")
const userExtractor = require("../utils/middleware").userExtractor
const { blogExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate("user", {username: 1, name: 1})
  response.json(blogs)
})
  
blogsRouter.get('/:id/comments', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
    .populate("comments", {content:1})
  response.json(blog.comments)
})
  
blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid"})
  }

  if(body.likes=== undefined){
    body.likes=0
  }
  if(body.title === undefined || body.url === undefined){
    response.status(400).json( { error: "title or url is missing" } )
  } else {
      const blog = new Blog({
        "url": body.url,
        "title": body.title,
        "likes": body.likes,
        "author": body.author,
        "user": request.user._id
      })
      const savedBlog = await blog.save()
      request.user.blogs = request.user.blogs.concat(savedBlog._id)
      await request.user.save()      
      response.status(201).json(savedBlog)
  }
})
  
  blogsRouter.delete("/:id", userExtractor, async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)
    if ( blog.user.toString() !== request.user._id.toString()){
      response.status(400).json( { error: "only the posting user can delete blog"})
    } else {
      await Blog.findByIdAndRemove(id);
      response.status(204).end()
    }
  })

  blogsRouter.put("/:id", async (request, response) => {
    const body = request.body
    const blog = {
      likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
  })

  
  blogsRouter.post("/:id/comments", blogExtractor, async (request, response) => {
    const body = request.body
    if(!body.content){
      response.status(400).json( { error: "comment has no content" } )
    } else {
      const comment = new Comment({
        "content": body.content,
      })
      const savedComment = await comment.save()
      request.blog.comments = request.blog.comments.concat(savedComment)
      await request.blog.save()      
      response.status(201).json(savedComment)
    }
  })
  
  module.exports = blogsRouter