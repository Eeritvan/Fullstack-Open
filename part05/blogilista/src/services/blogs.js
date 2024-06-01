import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
const setToken = newToken => { token = `Bearer ${newToken}` }
const resetToken = () => { let token = null }

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const newBlog = async (object) => {
    const config = { headers: { Authorization: token } }
    const response = await axios.post(baseUrl, object, config)
    return response.data
}

export default { getAll, setToken, resetToken, newBlog }