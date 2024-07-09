import { useMutation } from '@apollo/client'
import { CREATE_BOOK } from '../mutations'
import { GET_AUTHORS, GET_BOOKS } from '../queries'
import { useField } from '../hooks/hooks'
import { useState } from "react"

const NewBook = (props) => {
  const {reset: resetTitle, ...title} = useField('')
  const {reset: resetAuthor, ...author} = useField('')
  const {reset: resetPublished, ...published} = useField('')
  const {reset: resetGenre, ...genre} = useField('')
  const [genres, setGenres] = useState([])
  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => console.log(cache)
  })
  // vika tehtävä. Refetch ei ehkä toimi koska queries formaatti muuttunut (variablet)

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    await createBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres
      }
    })

    resetTitle()
    resetAuthor()
    resetPublished()
    resetGenre()
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.value))
    resetGenre()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          published
          <input {...published} type="number" />
        </div>
        <div>
          <input {...genre} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook