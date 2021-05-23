import { gql } from 'graphql-request'

export const ADD_IMAGE_BASE64 = gql`
  mutation AddImageBase64(
    $imageBase64: String!
    $type: String!
    $ownerId: Int!
  ) {
    addImageBase64(imageBase64: $imageBase64, type: $type, ownerId: $ownerId) {
      id
      imageUri
      ownerId
      presignedUrl
    }
  }
`

export const REPLACE_IMAGE_BASE64 = gql`
  mutation ReplaceImageBase64($img: String!, $id: Int!, $type: String!) {
    replaceImageBase64(img: $img, id: $id, type: $type) {
      id
      imageUri
      ownerId
      presignedUrl
    }
  }
`

export const ADD_IMAGE_PRESIGNED_URL = gql`
  mutation AddImagePresignedUrl(
    $mimeType: String!
    $type: String!
    $ownerId: Int!
  ) {
    addImagePresignedUrl(mimeType: $mimeType, type: $type, ownerId: $ownerId) {
      id
      imageUri
      ownerId
      presignedUrl
    }
  }
`

export const REPLACE_IMAGE_PRESIGNED_URL = gql`
  mutation ReplaceImagePresignedUrl(
    $mimeType: String!
    $id: Int!
    $type: String!
  ) {
    replaceImagePresignedUrl(mimeType: $mimeType, id: $id, type: $type) {
      id
      imageUri
      ownerId
      presignedUrl
    }
  }
`

export const DELETE_IMAGE = gql`
  mutation DeleteImage($imageId: Int!, $type: String!) {
    deleteImage(imageId: $imageId, type: $type) {
      id
      imageUri
      ownerId
    }
  }
`

export const IMAGE_URL = gql`
  query ImageUrl($id: Int!) {
    imageUrl(id: $id) {
      id
      imageUri
      ownerId
    }
  }
`

export const IMAGE_URLS = gql`
  query ImageUrls($type: String!, $ownerId: Int) {
    imageUrls(type: $type, ownerId: $ownerId) {
      id
      imageUri
      ownerId
    }
  }
`
