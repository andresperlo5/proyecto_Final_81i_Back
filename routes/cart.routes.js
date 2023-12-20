const express = require('express')
const { getAllProductsCart, deleteProductCart } = require('../controllers/cart.controllers')
const auth = require('../middlewars/auth')
const router = express.Router()

router.get('/:id', auth('user'), getAllProductsCart)
router.delete('/:idCart/:idProd', auth('user'), deleteProductCart)

module.exports = router