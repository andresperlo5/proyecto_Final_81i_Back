const UsersModel = require("../models/users.schema")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const CartModel = require("../models/cart.schema")
const FavModel = require("../models/fav.schema")

const createUser  = async(req, res) => {
  try {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()})
    }
    
    const { emailUsuario, contrasenia } = req.body
    const userExist = await UsersModel.findOne({emailUsuario})

    if(userExist){
      res.status(400).json({msg: 'usuario ya existe en la base de datos'})
      return
    }

    const newUser  = new UsersModel(req.body)

    const salt = bcryptjs.genSaltSync(10)
    newUser.contrasenia = bcryptjs.hashSync(contrasenia, salt)

    const newCart = new CartModel({idUser: newUser._id})
    const newFav = new FavModel({idUser: newUser._id})

    newUser.idCart = newCart._id
    newUser.idFav = newFav._id

    await newUser.save()
    await newCart.save()
    await newFav.save()
    
    res.status(201).json({msg: 'Usuario creado con exito', newUser})
  } catch (error) {
    res.status(500).json({msg: 'Falla en el server', error})
  }
}

const getUsers = async(req, res) => {
 try {
  const getAllUsers = await UsersModel.find()
  res.status(200).json({msg: 'Usuarios', getAllUsers})
 } catch (error) {
  res.status(500).json({msg: 'Falla en el server', error})
 }
}

const getOneUser = async(req,res) => {
  try {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()})
    }
    
     const getUser = await UsersModel.findOne({_id: req.params.id})
     res.status(200).json({msg: 'usuario encontrado', getUser})
  } catch (error) {
    res.status(500).json({msg: 'Falla en el server', error})
  }
}

const updateUser =  async(req, res) => {
 try {
  const updateOneUser = await UsersModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
  res.status(200).json({msg:'Usuario Actualizado', updateOneUser})
 } catch (error) {
  res.status(500).json({msg: 'Falla en el server', error})
 }
}

const deleteUser  = async(req, res) => {
  try {

    const userExist = await UsersModel.findOne({_id: req.params.id})

    if(!userExist){
      return res.status(400).json({msg: 'ID Incorrecto. Este usuario no existe en la DB'})
    }

    await UsersModel.findByIdAndDelete({_id: req.params.id})
    res.status(200).json({msg:'Usuario eliminado'})
  } catch (error) {
    res.status(500).json({msg: 'Falla en el server', error})
  }
}

const loginUser = async(req, res) => {
  try {
    const { emailUsuario, contrasenia } = req.body
    const userExist = await UsersModel.findOne({emailUsuario})
    
    if(!userExist){
      return res.status(400).json({msg: 'Usuario y/o contraseña incorrecto'})
    }

    const passCheck = bcryptjs.compareSync(contrasenia, userExist.contrasenia)

    if(!passCheck){
      return res.status(400).json({msg: 'Usuario y/o contraseña incorrecto'})
    }

    const payload = {
      idUsuario: userExist._id,
      idCarrito: userExist.idCart,
      idFavoritos: userExist.idFav,
      role: userExist.role
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY)
    res.status(200).json({msg:'Logueado', token, role: userExist.role, idUsuario: userExist._id})
  } catch (error) {
    res.status(500).json({msg: 'Falla en el server', error})
  }
}

module.exports = {
  createUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
  loginUser
}