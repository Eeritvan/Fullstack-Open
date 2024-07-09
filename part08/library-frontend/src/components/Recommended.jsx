import { ME, GET_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"

const Recommended = (props) => {
  const [genre, setGenre] = useState('')
  const { data } = useQuery(ME)
  const { data: bookData } = useQuery(GET_BOOKS, { variables: { genre: genre } })

  useEffect(() => {
    if (data) {
      setGenre(data.me.favoriteGenre)
    }
  }, [data])

  if (!props.show) {
    return null
  }

  let books = []
  if (bookData) {
    books = bookData.allBooks
  }

  return (
    <div>
      <h2><b>recommendations</b></h2>
      books in your favorite genre <b> {genre} </b>
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
    </div>
  )
}

export default Recommended