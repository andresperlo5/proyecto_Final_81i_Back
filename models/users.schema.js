const { Schema, model } = require('mongoose')

const UsersSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
  },
  emailUsuario: {
    type: String,
    required: true,
    unique: true
  },
  contrasenia: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  idCart: {
    type: String
  },
  idFav: {
    type: String
  }
})

UsersSchema.methods.toJSON = function () {
  const { __v, contrasenia, ...usuario } = this.toObject()
  return usuario
}

const UsersModel = model('users', UsersSchema)
module.exports = UsersModel