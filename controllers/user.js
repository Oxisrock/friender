'use strict'
// Imports
const User = require('../models/user') 
const passport = require('passport')

exports.Signup = (req, res, next) => {
  const data = { 
    name: req.body.name,
    last_name: req.body.last_name,
    idcc: req.body.idcc,
    place_birth: req.body.place_birth,
    email: req.body.email,
    tel: req.body.tel,
    username: req.body.username,
    nickname: req.body.nickname,
    password: req.body.password,
    birthdate: req.body.birthdate,
    sex: req.body.sex,
    place_residence: req.body.place_residence,
    tel_home: req.body.tel_home
  }
  const user = new User(data)

  User.findOne({email: req.body.email}, (err, userExist) =>{
    if (userExist) {
      return res.status(400).send('El email ya esta registrado')
    }
    user.save((err) => {
      if (err) {
        next(err)
      }
        req.logIn(user, (err) => {
        if (err) {
        next(err)
      }
        res.send('usuario creado exitosamente')
    })
    }) 
  })
}

exports.Login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      next(err)
    }
    if (!user) {
      return res.status(400).send('Username o contraseña no validos')
    }
    req.logIn(user, (err) =>{
      if (err) {
        next(err)
      }
      res.send('login Exitoso')
    })
  })(req, res, next);
}

exports.logout = (req, res) => {
  req.logout()
  res.send('logout Exitoso')
}


exports.deleteUser = (req, res) => { //funcion que borra registro de usuario
  let userId = req.params.userId

  User.findById(userId, (err, user) => {
    if (err) return res.status(500).send({message: 'Error al acceder al servidor'})
    
    if (!user) return res.status(404).send({message: 'El usuario no existe'})
    user.remove(err => {
      if (err) return res.status(500).send({message: 'Error al acceder al servidor'})
      res.status(200).send({message: `el usuario a sido borrado`})
    })
  })
}

exports.updateUser = (req, res) => { // funcion que actualiza la informacion del usuario

  let userId = req.params.userId
  let update = req.body
  User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
    if (err) return res.status(500).send({message: "Error al acceder al servidor"})

    res.status(200).json({userUpdate})
  }
)}

exports.getUsers = (req, res) => { 
  //recorrer base de datos metodo find ()
  User.find({}, (err, users) => { 
    if (err) return res.status(500).send({message: `Internal Server Error: ${err}`}) // Error en el servidor
    if (!users) return res.status(404).send({message: 'No encontrado'}) // Usuario no encontrados
    res.status(200).render('users/', {users: users})
     //usuarios encontrados
  })
}

exports.getUser = (req, res) => { 
  let userId = req.params.userId
  //recorrer base de datos hasta encontrar el userId
  User.findById(userId, (err, user) => { 
    if (err) return res.status(500).send({message: `Error interno del servidor: ${err}`}) // Error en el servidor
    if (!user) return res.status(404).send({message: 'Usuario no encontrado'}) //No existe el usuario

    res.status(200).json({user: user}) //usuario
  }
)}


/*
// Crear Usuario
function new_user (req, res) { 
  console.log('POST /Users')
  console.log(req.body)
  const data = { 
    name: req.body.name,
    last_name: req.body.last_name,
    idcc: req.body.idcc,
    place_birth: req.body.place_birth,
    email: req.body.email,
    tel: req.body.tel,
    username: req.body.username,
    nickname: req.body.nickname,
    password: req.body.password,
    birthdate: req.body.birthdate,
    sex: req.body.sex,
    place_residence: req.body.place_residence,
    tel_home: req.body.tel_home
  }

  const user = new User(data) // se crea nuevo usuario

  //Guardar usuario en base de datos
  user.save()
    .then(() => {
       console.log(user)
       res.status(200).json({user: user})
    }) 
    .catch((err)=> {
      res.status(500).send({ message: `Error interno del servidor: ${err}` })
   
    })
    
    // Se envia estatus y la informacion del usuario creado.
  }


//obtener todos los usuarios
function getUsers (req, res) { 
  //recorrer base de datos metodo find ()
  User.find({}, (err, users) => { 
    if (err) return res.status(500).send({message: `Internal Server Error: ${err}`}) // Error en el servidor
    if (!users) return res.status(404).send({message: 'No encontrado'}) // Usuario no encontrados
    res.status(200).json({users: users}) //usuarios encontrados
  })
}

//obetener usuario por ID
function getUser (req, res) { 
  let userId = req.params.userId
  //recorrer base de datos hasta encontrar el userId
  User.findById(userId, (err, user) => { 
    if (err) return res.status(500).send({message: `Error interno del servidor: ${err}`}) // Error en el servidor
    if (!user) return res.status(404).send({message: 'Usuario no encontrado'}) //No existe el usuario

    res.status(200).json({user: user}) //usuario
  })
}

//logueo de usuario
function login (req, res) { 
  //Encontrar usuario por nombre y password
  User.findOne({username: req.body.username, password: req.body.password}, (err, user) => { 
    if (err) return res.status(500).send({ message: err }) // si manda error 500 es que a pasado algo en la peticion
    if (!user) return res.status(404).send({ message: `Usurio no encontrado` })// si manda error 404 es que no existe este usuario
    req.session.user_id = user._id
    req.session.username = user.username
    req.session.nickname = user.nickname
    console.log(req.session.user);
    res.status(200).json({user: user}) // manda estado 200 y envia el mensaje que se a logeado correctamente

  })
}

function updateUser(req, res) { // funcion que actualiza la informacion del usuario

  let userId = req.params.userId
  let update = req.body
  User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
    if (err) return res.status(500).send({message: "Error al acceder al servidor"})

    res.status(200).json({userUpdate})
  }
)
}

function deleteUser(req, res) { //funcion que borra registro de usuario
  let userId = req.params.userId

  User.findById(req.params.userId, (err, user) => {
    if (err) return res.status(500).send({message: 'Error al acceder al servidor'})

    user.remove(err => {
      if (err) return res.status(500).send({message: 'Error al acceder al servidor'})
      res.status(200).send({message: `el usuario a sido borrado`})
    })
  })
}

//se exportan funciones
module.exports =
{
  new_user,
  login,
  getUsers,
  getUser,
  deleteUser,
  updateUser
}
*/