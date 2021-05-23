import { gql } from 'graphql-request'

export const ADD_LOCATION = gql`
  mutation AddLocation(
    $name: String!
    $friendlyName: String!
    $description: String!
    $latitude: Float!
    $longitude: Float!
    $locationTags: [LocationTagInput!]!
  ) {
    addLocation(
      name: $name
      friendlyName: $friendlyName
      description: $description
      latitude: $latitude
      longitude: $longitude
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
      imageUrls {
        id
        imageUri
        ownerId
      }
      needsCleaning
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
    $typeTags: [LocationTagInput!]
  ) {
    updateLocation(
      id: $id
      description: $description
      name: $name
      friendlyName: $friendlyName
      latitude: $latitude
      longitude: $longitude
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
      imageUrls {
        id
        imageUri
        ownerId
      }
      needsCleaning
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
      imageUrls {
        id
        imageUri
        ownerId
      }
      needsCleaning
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
      locationOwner
      friendlyName
      description
      imageUrls {
        id
        imageUri
        ownerId
      }
    }
  }
`

export const PICTURES = gql`
  query Locations($userId: Int) {
    locations(id: $userId) {
      id
    }
  }
`
