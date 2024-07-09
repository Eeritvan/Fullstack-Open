import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
  query($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
    }
  }
`

export const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      genres
      id
      published
    }
  }
`