const _ = require('lodash');

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    return blogs.reduce((pv, cv) => pv + cv.likes, 0)
}

const favoriteBlog = (blogs) => {
  let result = []
  if (typeof blogs !== 'undefined' && blogs.length > 0) {
    // the array is defined and has at least one element
    result= blogs.reduce((pv, cv) => (pv.likes > cv.likes)? pv : cv)
  } 
  return result
} 

const mostBlog = (blogs) => {
  let result = []
  if (typeof blogs !== 'undefined' && blogs.length > 0) {
      // the array is defined and has at least one element
    let author = _.mapValues(blogs, "author")
    author = Object.values(author)
    author =_.countBy(author)
    const maxBlog = Math.max.apply(null, Object.keys(author).map(x => author[x]))
    author = Object.keys(author).reduce((a, b)=> (author[a] > author[b]) ? a : b )
    result = {
      "author": author,
      "blogs": maxBlog
    }
  }
  return result
}

const mostLikes = (blogs) => {
  let result = []
  if (typeof blogs !== 'undefined' && blogs.length > 0) {
    // the array is defined and has at least one element
    const likes=blogs.map(blog=> ({"author":blog.author, "likes": blog.likes}))
    result = _(likes).groupBy("author")
    result = result.map((objs, key) => ({
      'author': key,
      'likes': _.sumBy(objs, 'likes') })).value()
    result = result.reduce((pv, cv) => pv.likes>cv.likes ? pv : cv)
  }
return result
}


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostLikes
  }