import { SIGN_IN, SIGN_UP, DELETE_USER } from '../../gql/auth'
import { getUserFromJwt } from '../jwtUtils.js'
import { setHeaders } from '../jwtUtils.js'
import { client } from '../client.js'
import { filterProblematicKey, getMimeType } from '../PresignedUrlUtils'

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

    /*
      user {
        $email: String!,
        $password: String!
      }
    */
    signIn(context, user) {
      return new Promise((resolve, reject) => {
        console.log('sign in')
        client
          .rawRequest(SIGN_IN, user)
          .then(({ data }) => {
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

    /*
      user {
        $email: String!,
        $password: String!,
        $username: String!,
        $contact: String!,
        $description: String!
        $image: the actual image
      }
    */
    signUp({ commit, dispatch, rootState }, user) {
      return new Promise((resolve, reject) => {
        console.log('sign up')
        const newUser = filterProblematicKey(user, 'image')
        client
          .rawRequest(SIGN_UP, newUser)
          .then(({ data }) => {
            setHeaders({
              AccessToken: data.signUp.accessToken,
              RefreshToken: data.signUp.refreshToken
            })
            // TODO add image here now that we have userId
            const newUser = getUserFromJwt(data.signUp.accessToken)
            dispatch('addImagePreSignedUrl', {
              imageFile: user.image,
              mimeType: getMimeType(user.image),
              type: 'orgUser',
              ownerId: parseInt(newUser.jti)
            })
              .then(() => {
                commit('SIGN_IN', getUserFromJwt(data.signUp.accessToken))
                commit('SET_TOKENS', {
                  accessToken: data.signUp.accessToken,
                  refreshToken: data.signUp.refreshToken
                })
                resolve(
                  rootState.userDataMod.userDatas.filter(
                    us => us.id === user.id
                  )
                )
              })
              .catch(err => console.log(err))
            // not a typo, only sign in on the client side cus its just setting the jwt
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

    /*
      id {
        $id: Int!
      }
    */
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
