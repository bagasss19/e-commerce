const route = require('express').Router()
const Controller = require('../controller/adminCrud')
const {authentication} = require('../middleware/authentication')
const {authorization} = require('../middleware/authorization')

route.use(authentication)
route.get('/', Controller.read)
route.get('/:id', Controller.readId)
route.post('/', Controller.add)
route.put('/:id', authorization ,Controller.edit)
route.delete('/:id', authorization , Controller.delete)

module.exports = route