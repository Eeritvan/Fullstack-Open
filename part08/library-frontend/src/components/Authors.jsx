import { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_AUTHORS } from '../queries'
import { SET_BIRTHYEAR } from '../mutations'
import { useField } from '../hooks/hooks'

const Authors = (props) => {
  const {reset: resetAuthor, ...author} = useField('')
  const {reset: resetYear, ...year} = useField('')
  const [ editYear ] = useMutation(SET_BIRTHYEAR, { refetchQueries: [ { query: GET_AUTHORS } ] })
  const { data } = useQuery(GET_AUTHORS)

  useEffect(() => {
    if (data && data.allAuthors.length > 0) {
      author.onChange({ target: { value: data.allAuthors[0].name } })
    }
  }, [data])

  if (!props.show) {
    return null
  }

  const updateYear = async (e) => {
    e.preventDefault()
    await editYear({
      variables: {
        name: author.value,
        setBornTo: Number(year.value)
      }
    })
    resetYear()
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
        <select {...author}>
          {authors.map(a =>
            <option key={a.name} value={a.name}>{a.name}</option>
          )}
        </select>
        <div>born<input {...year} type="number" /></div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
