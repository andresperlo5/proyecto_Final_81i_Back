const express = require('express')
const router = express.Router()

const productsRoutes = require('./products.routes')
const usersRoutes = require('./users.routes')
const cartRoutes = require('./cart.routes')
const favRoutes = require('./fav.routes')

router.use('/products', productsRoutes)
router.use('/users', usersRoutes)
router.use('/carts', cartRoutes)
router.use('/favs', favRoutes)

module.exports = router
