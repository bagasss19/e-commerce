const route = require('express').Router()
const Wishlist = require('../controller/wishlist')
const {custAuthentication} = require('../middleware/authentication')
const {wishlistAuthorization} = require('../middleware/authorization')

route.use(custAuthentication)
route.post('/:id', Wishlist.add)
route.get('/', Wishlist.read)
route.delete('/:id', wishlistAuthorization , Wishlist.delete)
module.exports = route