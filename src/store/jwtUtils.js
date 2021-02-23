var jwt = require('jsonwebtoken')
import { client } from './client.js'

export function getUserFromJwt(token) {
  if (token == null) {
    return null
  }
  return jwt.decode(token)
}

export function setHeaders(tokens) {
  client.setHeader('AccessToken', tokens.AccessToken)
  client.setHeader('RefreshToken', tokens.RefreshToken)
}
