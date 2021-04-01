import { GraphQLClient } from 'graphql-request'

// the client is within the store directory because all client calls will occur within vuex actions
const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://api.rocfreestands.app/graphql'
    : 'http://localhost:8080/graphql'

export const client = new GraphQLClient(endpoint, {
  headers: {
    AccessToken: '',
    RefreshToken: ''
  },
  mode: 'cors'
})
