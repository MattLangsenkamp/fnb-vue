import { gql } from 'graphql-request'

export const USER_DATA = gql`
  query UserData($userDataId: Int, $orgUserId: Int) {
    userData(userDataId: $userDataId, orgUserId: $orgUserId) {
      id
      username
      contact
      orgUserId
      description
      pictureURI
      locations {
        id
        locationName
      }
    }
  }
`

export const USER_DATAS = gql`
  query UserDatas {
    userDatas {
      id
      username
      contact
      description
      pictureURI
      locations {
        id
        locationName
      }
    }
  }
`

export const ADD_USER_DATA = gql`
  mutation AddUserData(
    $username: String!
    $picture: String!
    $description: String!
    $contact: String!
  ) {
    addUserData(
      username: $username
      picture: $picture
      description: $description
      contact: $contact
    ) {
      id
      username
      orgUserId
      contact
      description
      pictureURI
    }
  }
`

export const UPDATE_USER_DATA = gql`
  mutation UpdateUserData(
    $id: Int!
    $username: String
    $contact: String
    $description: String
    $picture: String
    $locations: [LocationInput!]
  ) {
    updateUserData(
      id: $id
      username: $username
      contact: $contact
      description: $description
      picture: $picture
      locations: $locations
    ) {
      id
      username
      contact
      description
      pictureURI
      locations {
        id
        locationName
      }
    }
  }
`

export const DELETE_USER_DATA = gql`
  mutation DeleteUserData($id: Int!) {
    deleteUserData(id: $id) {
      id
      username
      contact
      description
      pictureURI
      locations {
        id
        locationName
      }
    }
  }
`
