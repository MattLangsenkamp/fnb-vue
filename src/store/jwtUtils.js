var jwt = require('jsonwebtoken')

export function getUserFromJwt(token) {
  if (token == null) {
    return null
  }
  return jwt.decode(token)
}
