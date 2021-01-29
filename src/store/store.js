import { createStore } from 'vuex'
import { request, gql } from 'graphql-request'

const gql_stub = gql``

export const store = createStore({
  state: {
    url: '',
    loggedInUser: null,
    locs: [
      {
        id: 1,
        friendlyName: 'f-hfasdfasdfi',
        description: 'first',
        latitude: 43.1531,
        longitude: -77.607649,
        locationName: 'i',
        needsCleaning: false,
        creationDateTime: '2020-12-25T01:57:24.958576Z',
        pictureURI: 'goober',
        locationOwner: 1,
        locationTags: [
          {
            id: 1
          }
        ]
      },
      {
        id: 2,
        friendlyName: 'f-hfasdfasdfi',
        description: 'cool i made another',
        latitude: 43.1521,
        longitude: -77.617649,
        locationName: 'south wedge mission',
        needsCleaning: false,
        creationDateTime: '2020-12-25T03:49:31.407661Z',
        pictureURI: 'goober',
        locationOwner: 1,
        locationTags: []
      }
    ]
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  getters: {
    location: state => id => {
      return state.locs.filter(loc => loc.id === id)
    },
    loggedInUser() {
      return state.loggedInUser
    }
  },
  mutations: {
    ADD_LOCATION(state, location) {
      state.locs.push(location)
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
    }
  },
  actions: {
    addLocation(context, location) {
      // TODO request
      //request(this.state.url, gql_stub).then(data => {
      console.log(location.name)

      context.commit('ADD_LOCATION', location)
      //})
    },
    signIn(context, user) {
      // TODO
      //request(this.state.url, gql_stub).then(data => {
      context.commit('SIGN_IN', user)
      //})
    },
    deleteLocation(context, location) {
      // TODO
      //request(this.state.url, gql_stub).then(data => {
      context.commit('DELETE_LOCATION', location)
      //})
    },
    updateLocation(context, location) {
      // TODO
      //request(this.state.url, gql_stub).then(data => {
      context.commit('UPDATE_LOCATION', location)
      //})
    },
    updateUser(context, user) {
      // TODO
      //request(this.state.url, gql_stub).then(data => {
      context.commit('UPDATE_USER', user)
      //})
    }
  }
})
