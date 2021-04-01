import { SIGN_IN, SIGN_UP, DELETE_USER } from '../../gql/auth'
import { getUserFromJwt } from '../jwtUtils.js'
import { setHeaders } from '../jwtUtils.js'
import { client } from '../client.js'

export const auth = {
  state: () => ({
    loggedInUser: null,
    accessToken: null,
    refreshToken: null
  }),
  mutations: {
    LOG_OUT(state) {
      state.loggedInUser = null
    },
    SIGN_IN(state, user) {
      state.loggedInUser = user
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
      const accessToken = localStorage.getItem('accessToken') || ''
      const refreshToken = localStorage.getItem('refreshToken') || ''

      context.commit('SIGN_IN', getUserFromJwt(accessToken))
      context.commit('SET_TOKENS', { accessToken, refreshToken })

      setHeaders({
        AccessToken: accessToken,
        RefreshToken: refreshToken
      })
    },
    signIn(context, user) {
      return new Promise((resolve, reject) => {
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
            resolve(data)
          })
          .catch(err => console.log(err))
      })
    },
    signUp(context, user) {
      return new Promise((resolve, reject) => {
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
            context.commit('SIGN_IN', getUserFromJwt(data.signUp.accessToken))
            context.commit('SET_TOKENS', {
              accessToken: data.signUp.accessToken,
              refreshToken: data.signUp.refreshToken
            })
            resolve()
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    logOut(context) {
      context.commit('LOG_OUT')
      context.commit('SET_TOKENS', { accessToken: null, refreshToken: null })
    },
    deleteUser(context, id) {
      return new Promise((resolve, reject) => {
        client
          .rawRequest(DELETE_USER, id)
          .then(({ data }) => {
            context.commit('DELETE_USER_DATA_BY_USER', data.deleteUser)
            context.commit('LOG_OUT')
            context.commit('SET_TOKENS', {
              accessToken: null,
              refreshToken: null
            })
            resolve()
          })
          .catch(err => console.log(err))
      })
    }
  }
}
