import { React } from "react"
import { useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const User = () => {
    const id = useParams().id
    const user = useSelector(state => state.users.filter(user => user.id===id)[0])
    if(!user){
        return null
    }
    const blogList = () => (
        <Table striped>
            <tbody>
                {user.blogs.map(blog =>
                    <tr key={blog.id}>
                        <td>
                            <Link to={`/blogs/${blog.id}`}>
                                {blog.title}
                            </Link>
                        </td>
                    </tr>)}
            </tbody>
        </Table>
    )



    return(
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            {blogList()}
        </div>
    )}
export default User