import { gql } from 'graphql-request'

export const ADD_LOCATION = gql`
  mutation AddLocation(
    $name: String!
    $friendlyName: String!
    $description: String!
    $latitude: Float!
    $longitude: Float!
    $picture: String!
    $locationTags: [LocationTagInput!]!
  ) {
    addLocation(
      name: $name
      friendlyName: $friendlyName
      description: $description
      latitude: $latitude
      longitude: $longitude
      picture: $picture
      locationTags: $locationTags
    ) {
      id
      locationName
      friendlyName
      description
      latitude
      longitude
      locationOwner
      locationTags {
        description
        tagName
        id
        ownerId
      }
      needsCleaning
      pictureURI
    }
  }
`

export const UPDATE_LOCATION = gql`
  mutation UpdateLocation(
    $id: Int!
    $name: String
    $friendlyName: String
    $description: String
    $latitude: Float
    $longitude: Float
    $picture: String
    $typeTags: [LocationTagInput!]
  ) {
    updateLocation(
      id: $id
      description: $description
      name: $name
      friendlyName: $friendlyName
      latitude: $latitude
      longitude: $longitude
      picture: $picture
      typeTags: $typeTags
    ) {
      id
      locationName
      friendlyName
      description
      latitude
      longitude
      locationOwner
      locationTags {
        description
        tagName
        id
        ownerId
      }
      needsCleaning
      pictureURI
    }
  }
`

export const DELETE_LOCATION = gql`
  mutation DeleteLocation($id: Int!) {
    deleteLocation(id: $id) {
      id
      locationName
      friendlyName
      description
      latitude
      longitude
      locationOwner
      locationTags {
        description
        tagName
        id
        ownerId
      }
      needsCleaning
      pictureURI
    }
  }
`

export const LOCATION = gql`
  query Location($id: Int!) {
    location(id: $id) {
      id
      locationName
      friendlyName
      description
      latitude
      longitude
      locationOwner
      locationTags {
        description
        tagName
        id
        ownerId
      }
      needsCleaning
      pictureURI
    }
  }
`

export const LOCATIONS = gql`
  query Locations($userId: Int) {
    locations(id: $userId) {
      id
      latitude
      longitude
      locationName
    }
  }
`
