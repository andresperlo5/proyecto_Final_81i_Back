const express = require('express')
const { check } = require('express-validator')
const { createUser, getUsers, updateUser, deleteUser, getOneUser, loginUser } = require('../controllers/users.controllers')
const auth = require('../middlewars/auth')
const route = express.Router()

route.post('/', [
  check('nombreUsuario', 'El campo nombreUsuario esta vacio').notEmpty(),
  check('emailUsuario', 'El campo emailUsuario esta vacio').notEmpty(),
  check('emailUsuario', 'Formato Incorrecto. EJ: mail@dominio.com').isEmail(),
  check('emailUsuario', 'Min: 8 Max: 50').isLength({ min: 8, max: 50 }),
  check('contrasenia', 'Campo Contrasenia Vacio').notEmpty(),
  check('contrasenia', 'Min: 8 caracteres').isLength({ min: 8 }),
], createUser)
route.post('/login', loginUser)
route.get('/', auth('admin'), getUsers)
route.get('/:id',[
  check('id', 'Formato incorrecto de ID').isMongoId()
], auth('user'),getOneUser)
route.put('/:id', auth('admin'), updateUser)
route.delete('/:id', auth('admin'),deleteUser)

module.exports = route