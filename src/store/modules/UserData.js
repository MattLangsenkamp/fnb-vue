import { UPDATE_USER_DATA, USER_DATA } from '../../gql/userData.js'
import { setHeaders } from '../jwtUtils.js'
import { uploadFile } from '../PresignedUrlUtils'
import { client } from '../client.js'

export const userData = {
  state: () => ({ userDatas: [] }),
  mutations: {
    UPSERT_USER_DATA(state, user) {
      state.userDatas = state.userDatas.filter(us => us.id != user.id)
      state.userDatas.push(user)
    },
    DELETE_USER_DATA(state, user) {
      state.userDatas = state.userDatas.filter(us => us.id != user.id)
    },
    DELETE_USER_DATA_BY_USER(state, user) {
      state.userDatas = state.userDatas.filter(us => us.orgUserId != user.id)
    }
  },
  actions: {
    getUserData(context, id) {
      return new Promise((resolve, reject) => {
        client
          .rawRequest(USER_DATA, { userDataId: null, orgUserId: id })
          .then(({ data, errors, extensions, headers, status }) => {
            // setHeaders(headers)
            context.commit('UPSERT_USER_DATA', data.userData)
            resolve(data.userData)
          })
          .catch(err => {
            console.log(err)
            throw err
            reject()
          })
      })
    },
    updateUserData(context, user) {
      return new Promise((resolve, reject) => {
        client
          .rawRequest(UPDATE_USER_DATA, user)
          .then(({ data, headers }) => {
            uploadFile(user.picture, data.preSignedURL)
              .then(() => {
                context.commit('UPSERT_USER_DATA', data.updateUserData)
                resolve(data.updateUser)
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
    }
  }
}
