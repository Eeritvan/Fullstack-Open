import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = newPerson => axios.post(baseUrl, newPerson)

const deletePerson = id => axios.delete(`${baseUrl}/${id}`)

const uploadUpdate = updated => axios.put(`${baseUrl}/${updated.id}`, updated)

export default { getAll, add, deletePerson, uploadUpdate }