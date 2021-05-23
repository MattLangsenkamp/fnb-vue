import { gql } from 'graphql-request'

export const USER_DATA = gql`
  query UserData($userDataId: Int, $orgUserId: Int) {
    userData(userDataId: $userDataId, orgUserId: $orgUserId) {
      id
      username
      contact
      imageUrls {
        id
        imageUri
      }
      orgUserId
      description
      locations {
        id
        locationName
        imageUrls {
          id
          imageUri
          ownerId
        }
      }
    }
  }
`

export const USER_DATAS = gql`
  query UserDatas {
    userDatas {
      id
      username
      imageUrls {
        id
        imageUri
      }
      contact
      description
      locations {
        id
        locationName
        imageUrls {
          id
          imageUri
          ownerId
        }
      }
    }
  }
`

export const ADD_USER_DATA = gql`
  mutation AddUserData(
    $username: String!
    $description: String!
    $contact: String!
  ) {
    addUserData(
      username: $username
      description: $description
      contact: $contact
    ) {
      id
      username
      orgUserId
      contact
      description
    }
  }
`

export const UPDATE_USER_DATA = gql`
  mutation UpdateUserData(
    $id: Int!
    $username: String
    $contact: String
    $description: String
    $locations: [LocationInput!]
  ) {
    updateUserData(
      id: $id
      username: $username
      contact: $contact
      description: $description
      locations: $locations
    ) {
      id
      username
      contact
      imageUrls {
        id
        imageUri
      }
      description
      locations {
        id
        locationName
        imageUrls {
          id
          imageUri
        }
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
      locations {
        id
        locationName
      }
    }
  }
`
