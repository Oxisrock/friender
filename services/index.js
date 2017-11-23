'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
function createToken (user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(2, 'days').unix(),

  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token) {
  const decode = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN)

      if (payload.exp < moment().unix()){
        resolve({
          status: 401,
          message: 'El token se vencio'
        })
      }

      resolve(payload.sub)

    } catch (err) {
      reject({
        status: 500,
        menssage: 'Token Invalido'
      })
    }
  })
}


module.exports = createToken