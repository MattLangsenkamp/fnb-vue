import { gql } from 'graphql-request'

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
      email
      permissionLevel
    }
  }
`

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`
export const SIGN_UP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $username: String!
    $contact: String!
    $description: String!
  ) {
    signUp(
      email: $email
      password: $password
      username: $username
      contact: $contact
      description: $description
    ) {
      accessToken
      refreshToken
    }
  }
`
