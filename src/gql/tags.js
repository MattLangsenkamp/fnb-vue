import { gql } from 'graphql-request'

export const ADD_TAG = gql`
  mutation CreateTag($tagName: String!, $description: String!) {
    addLocationTag(tagName: $tagName, description: $description) {
      id
      ownerId
      description
      tagName
    }
  }
`

export const ASSIGN_TAGS = gql`
  mutation AssignTags($tags: [LocationTagInput!]!, $locationId: Int!) {
    assignTags(tags: $tags, locationId: $locationId) {
      id
      ownerId
      description
      tagName
    }
  }
`

export const DELETE_TAG = gql`
  mutation DeleteLocationTag($id: Int!) {
    deleteLocationTag(id: $id) {
      id
      description
      ownerId
      tagName
    }
  }
`

export const TAG = gql`
  query Tag($id: Int!) {
    locationTag(id: $id) {
      id
      ownerId
      description
      tagName
    }
  }
`

export const TAGS = gql`
  query Tags {
    locationTags {
      id
      ownerId
      description
      tagName
    }
  }
`

export const UNNASSIGN_TAGS = gql`
  mutation UnassignTags($tags: [LocationTagInput!]!, $locationId: Int!) {
    UnassignLocationTags(tags: $tags, locationId: $locationId) {
      id
      ownerId
      description
      tagName
    }
  }
`

export const UPDATE_TAG = gql`
  mutation UpdateTag($id: Int!, $description: String, $tagName: String) {
    updateTag(id: $id, description: $description, tagName: $tagName) {
      id
      tagName
      description
      ownerId
    }
  }
`
