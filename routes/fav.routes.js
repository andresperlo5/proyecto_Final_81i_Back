const express = require('express')
const { getAllProductsFav, deleteProductFav } = require('../controllers/fav.controllers')
const auth = require('../middlewars/auth')
const router = express.Router()

router.get('/:id', auth('user'), getAllProductsFav)
router.delete('/:idFav/:idProd', auth('user'),deleteProductFav)

module.exports = router