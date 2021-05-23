import {
  ADD_IMAGE_BASE64,
  REPLACE_IMAGE_BASE64,
  ADD_IMAGE_PRESIGNED_URL,
  REPLACE_IMAGE_PRESIGNED_URL,
  DELETE_IMAGE,
  IMAGE_URL,
  IMAGE_URLS
} from '../../gql/Images'

import { uploadFile, filterProblematicKey } from '../PresignedUrlUtils'
import { client } from '../client.js'

export const image = {
  state: () => ({}),
  mutations: {},
  actions: {
    /*
        img{
            $imageBase64: String!
            $type: String!
            $ownerId: Int!
        }
        */
    addImageBase64(context, img) {
      return new Promise((resolve, reject) => {
        client.rawRequest(ADD_IMAGE_BASE64, img).then(({ data, headers }) => {
          //setHeaders(headers)
          resolve(data.addImageBase64)
        })
      })
    },

    /*
        img{
            $imageFile: the actual image
            $mimeType: String!
            $type: String
            $ownerId: Int!
        }
    */
    addImagePreSignedUrl({ context, state }, img) {
      return new Promise((resolve, reject) => {
        const newImg = filterProblematicKey(img, 'imageFile')
        client
          .rawRequest(ADD_IMAGE_PRESIGNED_URL, newImg)
          .then(({ data, headers }) => {
            //setHeaders(headers)
            uploadFile(
              img.imageFile,
              data.addImagePresignedUrl.presignedUrl
            ).then(newImageData => {
              resolve(data.addImagePresignedUrl)
            })
          })
      })
    },

    /*
        img {
            $img: String!, 
            $id: Int!, 
            $type: String!
        }
    */
    replaceImageBase64({ context, state }, img) {
      return new Promise((resolve, reject) => {
        client
          .rawRequest(REPLACE_IMAGE_BASE64, img)
          .then(({ data, headers }) => {
            resolve(data.replaceImageBase64)
          })
      })
    },

    /*
        img {
            $imageFile: the actual image
            $mimeType: String!
            $id: Int!
            $type: String!
        }
    */
    replaceImagePreSignedUrl({ context, state }, img) {
      return new Promise((resolve, reject) => {
        const newImg = filterProblematicKey(img, 'imageFile')
        client
          .rawRequest(REPLACE_IMAGE_PRESIGNED_URL, newImg)
          .then(({ data, headers }) => {
            //setHeaders(headers)
            console.log(data)
            uploadFile(
              img.imageFile,
              data.replaceImagePresignedUrl.presignedUrl
            ).then(() => {
              resolve(data.replaceImagePresignedUrl)
            })
          })
      })
    },

    /*
        img {
            $imageId: Int!,
            $type: String!
        }
    */
    deleteImage(context, img) {
      return new Promise((resolve, reject) => {
        client.rawRequest(DELETE_IMAGE, img).then(({ data, headers }) => {
          //setHeaders(headers)
          resolve(data.deleteImage)
        })
      })
    },

    /*
        img {
            $id: Int!, 
            $type: String!
        }
    */
    imageUrl(context, img) {
      return new Promise((resolve, reject) => {
        client.rawRequest(IMAGE_URL, img).then(({ data, headers }) => {
          //setHeaders(headers)
          resolve(data.imageUrl)
        })
      })
    },

    /*
        img {
            $type: String!, 
            $ownerId: Int
        }
    */
    imageUrls(context, img) {
      return new Promise((resolve, reject) => {
        client.rawRequest(IMAGE_URLS, img).then(({ data, headers }) => {
          //setHeaders(headers)
          resolve(data.imageUrls)
        })
      })
    }
  }
}
