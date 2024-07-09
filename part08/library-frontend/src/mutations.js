import { gql } from '@apollo/client'

export const SET_BIRTHYEAR = gql`
  mutation editYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      id
      title
      author { 
        name
      }
      published
      genres
    }
  }
`

export const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`