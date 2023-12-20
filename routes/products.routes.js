const express = require('express')
const route = express.Router()
const { createProduct, getProducts, updateProduct, deleteProduct, getOneProduct, addProdCart, addProdFav } = require('../controllers/products.controllers')
const auth = require('../middlewars/auth')
const multer = require('../middlewars/multer')

route.post('/', multer.single('imagen'), auth('admin'), createProduct)
route.post('/cart/:idProd', auth('user'), addProdCart)
route.post('/fav/:idProd', auth('user'), addProdFav)
route.get('/', getProducts)
route.get('/:id', getOneProduct)
route.put('/:id', auth('admin'), updateProduct)
route.delete('/:id',auth('admin'), deleteProduct)

module.exports = route