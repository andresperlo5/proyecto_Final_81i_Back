const ProductsModel = require("../models/products.schema")
const cloudinary = require('../helpers/clodinary')
const CartModel = require("../models/cart.schema")
const UsersModel = require("../models/users.schema")
const FavModel = require("../models/fav.schema")

const createProduct = async (req, res) => {
  try {

    const { titulo, precio, codigo } = req.body

    if (!titulo || !precio || !codigo) {
      res.status(400).json({ msg: 'Algun campo esta vacio' })
      return
    }
    const results = await cloudinary.uploader.upload(req.file.path);
    const newProduct = new ProductsModel({ ...req.body, imagen: results.secure_url })
    await newProduct.save()
    res.status(201).json({ msg: 'Producto creado con exito', newProduct })
  } catch (error) {
    res.status(500).json({ msg: 'Falla en el server', error })
  }
}

const getProducts = async (req, res) => {
  try {
    const getAllProducts = await ProductsModel.find()
    res.status(200).json({ msg: 'Productos encontrados', getAllProducts })
  } catch (error) {
    res.status(500).json({ msg: 'Falla en el server', error })
  }
}

const getOneProduct = async (req, res) => {
  try {
    const getProduct = await ProductsModel.findOne({ _id: req.params.id })
    res.status(200).json({ msg: 'Producto encontrado', getProduct })
  } catch (error) {
    res.status(500).json({ msg: 'Falla en el server', error })
  }
}

const updateProduct = async (req, res) => {
  try {

    const updateProduct = await ProductsModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.status(200).json({ msg: 'Producto Actualizado', updateProduct })

  } catch (error) {
    res.status(500).json({ msg: 'Falla en el server', error })
  }
}

const deleteProduct = async (req, res) => {
  try {

    const productExist = await ProductsModel.findOne({ _id: req.params.id })

    if (!productExist) {
      res.status(400).json({ msg: 'El producto que intentas borrar no existe en la base de datos' })
      return
    }

    await ProductsModel.findByIdAndDelete({ _id: req.params.id })
    res.status(200).json({ msg: 'Producto eliminado' })
  } catch (error) {
    res.status(500).json({ msg: 'Falla en el server', error })
  }
}

const addProdCart = async (req, res) => {
  try {
    const cartExist = await CartModel.findOne({ _id: req.idCarrito })
    const userCart = await UsersModel.findOne({ _id: req.idUsuario })

    if (!cartExist) {
      return res.status(400).json({ msg: 'Carrito no existe' })
    }

    if (cartExist._id.toString() === userCart.idCart) {

      const prodFind = await ProductsModel.findOne({ _id: req.params.idProd })
      const prodFilter = cartExist.products.filter((prod) => prod._id.toString() === prodFind._id.toString())

      if (prodFilter.length > 0) {
        return res.status(400).json({ msg: 'El producto ya existe en el carrito' })
      }

      cartExist.products.push(prodFind)
      await cartExist.save()
      res.status(200).json({ msg: 'Producto cargado correctamente al carrito' })
    } else {
      return res.status(400).json({ msg: 'ID carrito y/o usuario incorrecto' })
    }

  } catch (error) {
    res.status(500).json({ msg: 'Falla en el server', error })
  }
}

const addProdFav = async (req, res) => {
  try {
    const favProd = await FavModel.findOne({ _id: req.idFavoritos })
    const userFav = await UsersModel.findOne({ _id: req.idUsuario })

    if (!favProd) {
      return res.status(400).json({ msg: 'ID favorito incorrecto' })
    }

    if (favProd._id.toString() === userFav.idFav) {
      const prodFav = await ProductsModel.findOne({ _id: req.params.idProd })
      const favProdFilter = favProd.favorites.filter((fav) => fav._id.toString() === prodFav._id.toString())

      if (favProdFilter.length > 0) {
        return res.status(400).json({ msg: 'El producto ya existe en favoritos' })
      }

      favProd.favorites.push(prodFav)
      await favProd.save()
      res.status(200).json({ msg: 'El producto se cargo en favoritos' })
    } else {
      return res.status(400).json({ msg: 'ID favoritos y/o usuario incorrecto' })
    }
  } catch (error) {
    res.status(500).json({ msg: 'Falla en el server', error })
  }
}

module.exports = {
  createProduct,
  getProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  addProdCart,
  addProdFav

}