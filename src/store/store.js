import { createStore, createLogger } from 'vuex'
import { auth } from './modules/Auth.js'
import { location } from './modules/Locations.js'
import { userData } from './modules/UserData.js'

export const store = createStore({
  modules: {
    authMod: auth,
    locMod: location,
    userDataMod: userData
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})
