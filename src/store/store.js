import { createStore, createLogger } from 'vuex'
import { client } from './client.js'
import { getUserFromJwt } from './jwtUtils'
import { SIGN_IN, SIGN_UP } from '../gql/auth'
import {
  DELETE_LOCATION,
  ADD_LOCATION,
  UPDATE_LOCATION,
  LOCATION,
  LOCATIONS
} from '../gql/locations'
import { UPDATE_USER_DATA, USER_DATA } from '../gql/userData.js'

function setHeaders(tokens) {
  client.setHeader('AccessToken', tokens.AccessToken)
  client.setHeader('RefreshToken', tokens.RefreshToken)
}

export const store = createStore({
  state: {
    loggedInUser: null,
    accessToken: null,
    refreshToken: null,
    locs: [],
    users: []
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  getters: {
    location: state => id => {
      return state.locs.find(loc => loc.id === id)
    },
    userData: state => orgId => {
      console.log('po')
      console.log(orgId)
      return state.users.find(us => us.orgUserId == orgId)
    },
    loggedInUser() {
      return state.loggedInUser
    }
  },
  mutations: {
    ADD_LOCATION(state, location) {
      state.locs.push(location)
    },
    LOG_OUT(state) {
      state.loggedInUser = null
    },
    SIGN_IN(state, user) {
      state.loggedInUser = user
    },
    DELETE_LOCATION(state, location) {
      state.locs = state.locs.filter(loc => loc.id != location.id)
    },
    UPDATE_LOCATION(state, location) {
      state.locs = state.locs.filter(loc => loc.id != location.id)
      state.locs.push(location)
    },
    UPDATE_USER(state, user) {
      state.loggedInUser = user
    },
    SET_LOCATIONS(state, locations) {
      state.locs = locations
    },
    ADD_USER(state, user) {
      state.users = state.users.filter(us => us.id != user.id)
      state.users.push(user)
    },
    DELETE_USER(state, user) {
      state.users = state.users.filter(us => us.id != user.id)
    },
    SET_TOKENS(state, { accessToken, refreshToken }) {
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    }
  },
  actions: {
    init(context) {
      // TODO sign in here
      console.log('init')
      const accessToken = localStorage.getItem('accessToken') || ''
      const refreshToken = localStorage.getItem('accessToken') || ''

      context.commit('SIGN_IN', getUserFromJwt(accessToken))
      context.commit('SET_TOKENS', { accessToken, refreshToken })

      setHeaders({
        AccessToken: accessToken,
        RefreshToken: refreshToken
      })
    },
    logOut(context) {
      context.commit('LOG_OUT')
      context.commit('SET_TOKENS', { accessToken: null, refreshToken: null })
    },
    addLocation(context, location) {
      return new Promise((resolve, reject) => {
        client
          .rawRequest(ADD_LOCATION, location)
          .then(({ data, headers }) => {
            //setHeaders(headers)
            context.commit('ADD_LOCATION', data.addLocation)
            resolve(data.location)
          })
          .catch(err => console.log(err))
      })
    },
    signIn(context, user) {
      console.log('sign in')
      client
        .rawRequest(SIGN_IN, user)
        .then(({ data }) => {
          console.log(data)
          setHeaders({
            AccessToken: data.signIn.accessToken,
            RefreshToken: data.signIn.refreshToken
          })
          context.commit('SIGN_IN', getUserFromJwt(data.signIn.accessToken))
          context.commit('SET_TOKENS', {
            accessToken: data.signIn.accessToken,
            refreshToken: data.signIn.refreshToken
          })
        })
        .catch(err => console.log(err))
    },
    signUp(context, user) {
      console.log('sign up')
      client
        .rawRequest(SIGN_UP, user)
        .then(({ data }) => {
          console.log(data)
          setHeaders({
            AccessToken: data.signUp.accessToken,
            RefreshToken: data.signUp.refreshToken
          })
          // not a typo, only sign in on the client side cus its just setting the jwt
          context.commit('SIGN_IN', getUserFromJwt(data.signUp.AccessToken))
        })
        .catch(err => console.log(err))
    },
    deleteLocation(context, location) {
      client
        .rawRequest(DELETE_LOCATION)
        .then(({ data, headers }) => {
          // setHeaders(headers)

          context.commit('DELETE_LOCATION', data.deleteLocation)
        })
        .catch(err => console.log(err))
    },
    updateLocation(context, location) {
      client
        .rawRequest(UPDATE_LOCATION, location)
        .then(({ data, headers }) => {
          // setHeaders(headers)

          context.commit('UPDATE_LOCATION', data.updateLocation)
        })
        .catch(err => console.log(err))
    },
    updateUser(context, user) {
      client
        .rawRequest(UPDATE_USER_DATA, user)
        .then(({ data, headers }) => {
          // setHeaders(headers)
          context.commit('UPDATE_USER', data.updateUser)
        })
        .catch(err => console.log(err))
    },
    getLocations(context) {
      client
        .rawRequest(LOCATIONS)
        .then(({ data, errors, extensions, headers, status }) => {
          // setHeaders(headers)
          context.commit('SET_LOCATIONS', data.locations)
        })
        .catch(err => console.log(err))
    },
    getUser(context, id) {
      return new Promise((resolve, reject) => {
        console.log(id)
        client
          .rawRequest(USER_DATA, { userDataId: null, orgUserId: id })
          .then(({ data, errors, extensions, headers, status }) => {
            // setHeaders(headers)
            context.commit('ADD_USER', data.userData)
            resolve(data.userData)
          })
          .catch(err => {
            console.log(err)
            throw err
            reject()
          })
      })
    },
    getLocation(context, id) {
      client
        .rawRequest(LOCATION, id)
        .then(({ data, headers }) => {
          // setHeaders(headers)
          context.commit('UPDATE_LOCATION', data.location)
        })
        .catch(err => console.log(err))
    }
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})
