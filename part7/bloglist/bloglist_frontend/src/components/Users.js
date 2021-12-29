import { React } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const Users = () => {
    const users = useSelector(state => state.users)
    const rowSpacing = {
        borderSpacing:"1em"
    }
    const userTable = users
        ? <Table striped style={rowSpacing}>
            <thead><tr><th></th><th>blogs created</th></tr></thead>
            <tbody>{
                users.map(user => <tr key={user.username}>
                    <td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)
            }</tbody></Table>

        : <div/>

    return(

        <div>
            <h2 style={{ padding:15 }}>Users</h2>
            {userTable}
        </div>
    )}

export default Users