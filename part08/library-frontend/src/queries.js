import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
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