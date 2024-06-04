import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
const setToken = newToken => { token = `Bearer ${newToken}` }
const resetToken = () => { token = null }

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const newBlog = async (object) => {
    const config = { headers: { Authorization: token } }
    const response = await axios.post(baseUrl, object, config)
    return response.data
}

const likeBlog = async blog => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const blogUrl = `${baseUrl}/${blog.id}`
    return await axios.put(blogUrl, updatedBlog)
}

const removeBlog = async blog => {
    const blogUrl = `${baseUrl}/${blog.id}`
    const config = { headers: { Authorization: token } }
    return await axios.delete(blogUrl, config)
}

export default { getAll,
    setToken,
    resetToken,
    newBlog,
    likeBlog,
    removeBlog }