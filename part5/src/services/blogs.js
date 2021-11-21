import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers : { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const like = async (blog) => {
    const newObject= {
        user: blog.user._id,
        likes: blog.likes+1,
        author: blog.author,
        title: blog.title,
        url: blog.url
    }
    const response = await axios.put(`${baseUrl}/${blog.id}`, newObject)
    return response.data
}
const deleteOne = async (blogId) => {
    const config = {
        headers : { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response.data
}

export default { getAll, setToken, create, like, deleteOne }