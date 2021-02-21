require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const user = require('./route/user')
const adminCrud = require('./route/adminCrud')
const customer = require('./route/customer')
const wishlist = require('./route/wishlist')
const err = require('./middleware/err')

app.use(cors())
app.use(express.urlencoded({ extended:true}))
app.use(express.json())
app.use(express.static(`${__dirname}/middleware`))

app.use('/', user)
app.use('/admin', adminCrud)
app.use('/customer', customer)
app.use('/wishlist', wishlist)
app.use(err)



module.exports = app