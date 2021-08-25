const jwt = require('jsonwebtoken')

function generateToken(param) {
    return jwt.sign(param,"sercet")
}

function verifyToken(param) {
    return jwt.verify(param, "sercet")
}

module.exports = {generateToken, verifyToken}

