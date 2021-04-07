import {
  DELETE_LOCATION,
  ADD_LOCATION,
  UPDATE_LOCATION,
  LOCATION,
  LOCATIONS,
  PICTURES
} from '../../gql/locations'
import { setHeaders } from '../jwtUtils.js'
import { uploadFile } from '../PresignedUrlUtils'
import { client } from '../client.js'

export const location = {
  state: () => ({ locs: [] }),
  mutations: {
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
    addLocation(context, location) {
      return new Promise((resolve, reject) => {
        client
          .rawRequest(ADD_LOCATION, location)
          .then(({ data, headers }) => {
            //setHeaders(headers)
            context.commit('UPSERT_LOCATION', data.addLocation)
            resolve(data.location)
          })
          .catch(err => console.log(err))
      })
    },
    updateLocation(context, location) {
      return new Promise((resolve, reject) => {
        client
          .rawRequest(UPDATE_LOCATION, location)
          .then(({ data, headers }) => {
            // setHeaders(headers)

            //
            context.commit('UPSERT_LOCATION', data.updateLocation)
            resolve(data.updateLocation)
          })
          .catch(err => console.log(err))
      })
    },
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
    getPictures(context) {
      return new Promise((resolve, reject) => {
        client
          .rawRequest(PICTURES)
          .then(({ data, errors, extensions, headers, status }) => {
            // setHeaders(headers)
            resolve(data.locations)
          })
          .catch(err => console.log(err))
      })
    },
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
    getAddress(context, location) {
      return new Promise((resolve, reject) => {
        console.log(location)
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
