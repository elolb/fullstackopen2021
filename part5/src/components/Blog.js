import { React, useState } from "react"
import blogService from "../services/blogs"
const Blog = ({ user, blog, blogs, setBlogs, handleLike, handleNotification }) => {
    const [expand, setExpand] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }


    const handleDelete = () => {
        if(window.confirm(`Are you sure you want to delete blog? ${blog.title} ${blog.author}`)){
            try {
                blogService.deleteOne(blog.id)
                setBlogs(blogs.filter(blogInList => blogInList.id!==blog.id))
                handleNotification(`Deleted ${blog.title} ${blog.author}`)
            } catch (error){
                handleNotification(error.message)
            }
        }
    }
    const deleteButton = () => {
        const blogPoster = blog.user[0].username
        return (blogPoster===user.username ? <button className="remove-blog-button" style={{ display:"block" }} onClick={handleDelete}>remove</button> : <></>
        )}
    const expandedView =
      <div>
          <p style={{ display:"inline-block" }}>{blog.title} {blog.author}</p> <button onClick={() => setExpand(!expand)}>hide</button>
          <p>{blog.url}</p>
          <p className="likes" style={{ display:"inline-block" }}>likes {likes}</p> <button className="like-button" onClick={() => handleLike(blog, setLikes, likes)}>like</button>
          {deleteButton()}
      </div>

    return  (
        <div className="blog" style={blogStyle}>
            {expand ? expandedView :
                <><p style={{ display:"inline-block" }}>{blog.title} {blog.author}</p> <button className="view" onClick={() => setExpand(!expand)}>view</button></>
            }
        </div>
    )}

export default Blog