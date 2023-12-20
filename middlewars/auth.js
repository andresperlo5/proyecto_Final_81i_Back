const jwt = require('jsonwebtoken')

const auth = ( role ) => async(req, res, next) =>{
  try {
   const token = req.header('auth')?.replace('Bearer ', '')
    
   if(!token){
      res.status(400).json({msg:'Token Incorrecto'})
   }

   const verify = jwt.verify(token, process.env.SECRET_KEY)

   if(verify && verify.role === role){
    req.idUsuario = verify.idUsuario,
    req.idCarrito = verify.idCarrito,
    req.idFavoritos = verify.idFavoritos
    next()
   }else{
    res.status(401).json({msg:'No autorizado'})
   }

  } catch (error) {
    res.status(500).json({msg: 'Falla en el server', error: error})
  }
}

module.exports = auth
