import {
  DELETE_LOCATION,
  ADD_LOCATION,
  UPDATE_LOCATION,
  LOCATION,
  LOCATIONS,
  PICTURES
} from '../../gql/locations'
import { setHeaders } from '../jwtUtils.js'
import { getMimeType, filterProblematicKey } from '../PresignedUrlUtils'
import { client } from '../client.js'

export const location = {
  state: () => ({ locs: [] }),
  mutations: {
    UPSERT_LOC_IMAGE_URL(state, imageUrl) {
      const oldLoc = JSON.parse(
        JSON.stringify(state.locs.find(loc => loc.id === imageUrl.ownerId))
      )
      state.locs = state.locs.filter(loc => loc.id != imageUrl.ownerId)
      var imgsWithoutNewImg = []
      if (oldLoc.imageUrls) {
        imgsWithoutNewImg = oldLoc.imageUrls.find(
          imgUrl => imgUrl.id === imageUrl.id
        )
      }
      const newImageUrls = imgsWithoutNewImg.push(imageUrl)
      const newLoc = oldLoc
      newLoc.imageUrls = newImageUrls
      console.log('newloc', newLoc)
      state.locs.push(newLoc)
    },
    UPSERT_LOCATION(state, location) {
      state.locs = state.locs.filter(loc => loc.id != location.id)
      state.locs.push(location)
    },
    SET_LOCATIONS(state, locations) {
      state.locs = locations
    },
    DELETE_LOCATION(state, location) {
      state.locs = state.locs.filter(loc => loc.id != location.id)
    }
  },
  actions: {
    /*
      location {
        $name: String!
        $friendlyName: String!
        $description: String!
        $latitude: Float!
        $longitude: Float!
        $locationTags: [LocationTagInput!]!
        $image: Actual File
      }
    */
    addLocation({ commit, dispatch, state }, location) {
      return new Promise((resolve, reject) => {
        const newLoc = filterProblematicKey(location, 'image')
        client
          .rawRequest(ADD_LOCATION, newLoc)
          .then(({ data, headers }) => {
            //setHeaders(headers)
            commit('UPSERT_LOCATION', data.addLocation)
            dispatch('addImagePreSignedUrl', {
              imageFile: location.image,
              mimeType: getMimeType(location.image),
              type: 'location',
              ownerId: parseInt(data.addLocation.id)
            })
              .then(imageUrl => {
                commit('UPSERT_LOC_IMAGE_URL', imageUrl)
                resolve(state.locs.filter(loc => loc.id === location.id))
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
    },

    /*
      location {
        $id: Int!
        $name: String
        $friendlyName: String
        $description: String
        $latitude: Float
        $longitude: Float
        $typeTags: [LocationTagInput!]
        $image: actual image
      }
    */
    updateLocation({ commit, dispatch, state }, location) {
      return new Promise((resolve, reject) => {
        const newLoc = filterProblematicKey(location, 'image')
        client
          .rawRequest(UPDATE_LOCATION, newLoc)
          .then(({ data, headers }) => {
            commit('UPSERT_LOCATION', data.updateLocation)
            if (location.image !== void 0) {
              dispatch('replaceImagePreSignedUrl', {
                imageFile: location.image,
                mimeType: getMimeType(location.image),
                type: 'location',
                id: data.updateLocation.imageUrls[0].id
              }).then(imageUrl => {
                commit('UPSERT_LOC_IMAGE_URL', imageUrl)
                resolve(state.locs.filter(loc => loc.id === location.id))
              })
            } else {
              resolve(state.locs.filter(loc => loc.id === location.id))
            }
          })
          .catch(err => console.log(err))
      })
    },

    /*

    */
    getLocations(context) {
      return new Promise((resolve, reject) => {
        client
          .rawRequest(LOCATIONS)
          .then(({ data, errors, extensions, headers, status }) => {
            // setHeaders(headers)
            context.commit('SET_LOCATIONS', data.locations)
            resolve(data.locations)
          })
          .catch(err => console.log(err))
      })
    },

    /*
      id: Int
    */
    getLocation(context, id) {
      return new Promise((resolve, reject) => {
        client
          .rawRequest(LOCATION, { id: id })
          .then(({ data, headers }) => {
            console.log(data)
            // setHeaders(headers)
            context.commit('UPSERT_LOCATION', data.location)
            resolve(data.location)
          })
          .catch(err => console.log(err))
      })
    },

    /*
      location {
        $id: Int!
      }
    */
    deleteLocation(context, location) {
      return new Promise((resolve, reject) => {
        client
          .rawRequest(DELETE_LOCATION, location)
          .then(({ data, headers }) => {
            // setHeaders(headers)

            context.commit('DELETE_LOCATION', data.deleteLocation)
            resolve(data.deleteLocation)
          })
          .catch(err => console.log(err))
      })
    },

    /*
      location {
        latitude: Float
        longitude: Float
      }
    */
    getAddress(context, location) {
      return new Promise((resolve, reject) => {
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.latitude}&lon=${location.longitude}`
        )
          .then(response => response.json())
          .then(data => {
            resolve(data)
          })
      })
    }
  }
}
