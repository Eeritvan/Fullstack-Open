import axios from 'axios'

const login = async (credentials) => {
  const response = await axios.post(
    'http://localhost:3003/api/login',
    credentials
  )
  return response.data
}

const getUsers = async () => {
  const response = await axios.get('http://localhost:3003/api/users')
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get('http://localhost:3003/api/users')
  const users = response.data
  return users.filter((user) => user.id === id)
}

export default { login, getUsers, getUser }
