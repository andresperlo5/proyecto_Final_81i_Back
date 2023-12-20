const { Schema, model } = require('mongoose')

const FavSChema = new Schema({
  idUser:{
    type: String
  },
  favorites:[]
})

const FavModel = model('fav', FavSChema)
module.exports = FavModel