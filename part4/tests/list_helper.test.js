const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test("when the list has no blogs, likes equal 0", () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test("when the list has many blogs, equals the sum of the likes", () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe("most likes", () => {
  test("when the list is undefined, returns empty array", () => {
    const result = listHelper.favoriteBlog(undefined)
    expect(result).toEqual([])
  })

  test("when the list exists but has no blog, returns empty array", () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual([])
  })

  test("when list has only one blog, returns that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    })
  })

  test("when the list has many blogs, returns the blog with most likes", () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
})

describe("author with most blogs", () => {
  test("return the author with the number of blogs", () => {
  const result = listHelper.mostBlog(blogs)
  expect(result).toEqual({
    author: "Robert C. Martin",
    blogs: 3
   })
  })

  test("when the list is undefined, returns empty array", () => {
    const result = listHelper.mostBlog(undefined)
    expect(result).toEqual([])
  })

  test("if the list is empty, return empty array", () => {
    const result = listHelper.mostBlog([])
    expect(result).toEqual([])
  })
})

describe("author with most total likes", () => {
  test("returns the author with their number of likes", () => {
  const result = listHelper.mostLikes(blogs)
  expect(result).toEqual({
    author: "Edsger W. Dijkstra",
    likes: 17
  })
  })

  test("when the list is undefined, returns empty array", () => {
    const result = listHelper.mostLikes(undefined)
    expect(result).toEqual([])
  })

  test("if the list is empty, returns empty array", () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual([])
  })

  test("when list has only one blog, returns that blog's author and likes", () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
})