import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [searchGenre, setSearchGenre] = useState('')
  const { data } = useQuery(GET_BOOKS, { variables: { genre: searchGenre } })

  if (!props.show) {
    return null
  }

  const categories = [
    'refactoring',
    'agile',
    'patterns',
    'design',
    'crime',
    'classic',
    'all genres'
  ]

  let books = []
  if (data) {
    books = data.allBooks
  }

  const searchCategories = async (genre) => {
    if (genre === 'all genres') {
      setSearchGenre('')
    } else {
      setSearchGenre(genre)
    }
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
        </tbody>
      </table>
      {categories.map(x =>
        <button key={x} onClick={() => searchCategories(x)}> {x} </button>
      )}
    </div>
  )
}

export default Books