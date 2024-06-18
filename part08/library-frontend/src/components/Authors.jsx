import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_AUTHORS } from '../queries'
import { SET_BIRTHYEAR } from '../mutations'

const Authors = (props) => {
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [ editYear ] = useMutation(SET_BIRTHYEAR, { refetchQueries: [ { query: GET_AUTHORS } ] })
  const { data } = useQuery(GET_AUTHORS)

  useEffect(() => {
    if (data && data.allAuthors.length > 0) {
      setAuthor(data.allAuthors[0].name)
    }
  }, [data])

  if (!props.show) {
    return null
  }

  const updateYear = async (e) => {
    e.preventDefault()
    await editYear({ variables: { name: author, setBornTo: Number(year) } })
    setYear('')
  }

  let authors = []
  if (data) {
    authors = data.allAuthors
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={updateYear}>
        <select onChange={event => setAuthor(event.target.value)}>
          {authors.map(a =>
            <option key={a.name} value={a.name}>{a.name}</option>
          )}
        </select>
        <div>born<input value={year} onChange={({ target }) => setYear(target.value)} type="number" /></div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
