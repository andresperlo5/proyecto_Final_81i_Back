const { Schema, model } = require('mongoose')

const CartSChema = new Schema({
  idUser: {
    type: String
  },
  products: [],
  quantity: {
    type: Number
  }
})

const CartModel = model('cart', CartSChema)
module.exports = CartModel