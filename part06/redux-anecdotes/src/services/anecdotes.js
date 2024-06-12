import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const addNew = async (content) => {
    const object = {
        content: content,
        id: getId(),
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

export const addVote = async (content) => {
    const idUrl = `${baseUrl}/${content.id}`
    const updatedContent = { ...content, votes: content.votes + 1 }
    const response = await axios.put(idUrl, updatedContent)
    return response.data
}

export default { addNew, addVote }