import { UPDATE_USER_DATA, USER_DATA } from '../../gql/userData.js'
import { setHeaders } from '../jwtUtils.js'
import { getMimeType, filterProblematicKey } from '../PresignedUrlUtils'
import { client } from '../client.js'

export const userData = {
  state: () => ({ userDatas: [] }),
  mutations: {
    UPSERT_USERDATA_IMAGE_URL(state, imageUrl) {
      const oldUserData = JSON.parse(
        JSON.stringify(state.userDatas.find(us => us.id === imageUrl.ownerId))
      )
      state.userDatas = state.userDatas.filter(us => us.id != imageUrl.ownerId)
      var imgsWithoutNewImg = []
      if (oldUserData.imageUrls) {
        imgsWithoutNewImg = oldUserData.imageUrls.filter(
          imgUrl => imgUrl.id != imageUrl.id
        )
      }
      const newImageUrls = imgsWithoutNewImg.push(imageUrl)
      const newUserData = oldUserData
      newUserData.imageUrls = newImageUrls
      state.userDatas.push(newUserData)
    },
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

  /*
    id: int
  */
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

    /*
      user {
        $id: Int!
        $username: String
        $contact: String
        $description: String
        $locations: [LocationInput!]
        image: The real image file
      }
    */
    updateUserData({ commit, dispatch, state }, user) {
      return new Promise((resolve, reject) => {
        const newUser = filterProblematicKey(user, 'image')
        client
          .rawRequest(UPDATE_USER_DATA, newUser)
          .then(({ data, headers }) => {
            commit('UPSERT_USER_DATA', data.updateUserData)
            if (user.image !== void 0) {
              dispatch('replaceImagePreSignedUrl', {
                imageFile: user.image,
                mimeType: getMimeType(user.image),
                type: 'orgUser',
                id: data.updateUserData.imageUrls[0].id
              })
                .then(imageUrl => {
                  commit('UPSERT_USERDATA_IMAGE_URL', imageUrl)
                  resolve(state.userDatas.filter(us => us.id === user.id))
                })
                .catch(err => console.log(err))
            }
          })
          .catch(err => console.log(err))
      })
    }
  }
}
