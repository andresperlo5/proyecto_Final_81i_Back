const FavModel = require("../models/fav.schema")
const ProductsModel = require("../models/products.schema")


const getAllProductsFav = async(req, res) => {
  try {
    const getProducts = await FavModel.findOne({_id: req.params.id})
    res.status(200).json({msg:'Favoritos', products: getProducts.favorites})
  } catch (error) {
    console.log(error)
  }
}

const deleteProductFav = async(req, res) => {
  try {
    const objFav = await FavModel.findOne({_id: req.params.idFav})
    const product = await ProductsModel.findOne({_id: req.params.idProd})
    const filterProd = objFav.favorites.filter((prod) => prod._id.toString() !== product._id.toString())
    const prodExistFilter = objFav.favorites.filter((prod) => prod._id.toString() === product._id.toString())

    if(prodExistFilter.length > 0){
      objFav.favorites = filterProd
      await objFav.save()
      res.status(200).json({msg:'Producto Eliminado de Favoritos'})
    }else{
      res.status(400).json({msg:'ID Favoritos incorrecto'})
    }
   
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllProductsFav,
  deleteProductFav
}