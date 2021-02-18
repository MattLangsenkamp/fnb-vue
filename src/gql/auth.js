import { gql } from 'graphql-request'

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
    $picture: String!
  ) {
    signUp(
      email: $email
      password: $password
      username: $username
      contact: $contact
      description: $description
      picture: $picture
    ) {
      accessToken
      refreshToken
    }
  }
`
