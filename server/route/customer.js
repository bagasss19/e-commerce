const route = require('express').Router()
const Customer = require('../controller/cart')
const {custAuthentication} = require('../middleware/authentication')
const {cartAuthorization} = require('../middleware/authorization')

route.get('/', Customer.read)
route.use(custAuthentication)
route.get('/cart', Customer.readCart)
route.get('/transaction', Customer.readTransaction)
route.put('/checkout',Customer.checkout)
route.post('/:id', Customer.add)
route.put('/:id', cartAuthorization ,Customer.increaseQuantiy)
route.patch('/:id', cartAuthorization ,Customer.decreaseQuantiy)
route.delete('/:id', cartAuthorization , Customer.deleteCart)

module.exports = route