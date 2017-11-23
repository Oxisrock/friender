'use strict'
const User = require('../models/user') // se importa modelo User, UserShema
function signUp (req, res) { // función para registrar usuarios
  console.log('POST /Users')
  console.log(req.body)
  const data = { // se guarda todos los datos del body en una constante
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
  user.save((err) => { // se guarda el usuario en la base de datos
    if (err) return res.status(500).send({ message: `Error al registrar usuario: ${err}` }) // si paso algun error a mandar a guardar
    console.log('usuario creado')
    //console.log('Email :' + req.body.email)
    //console.log('Password :' + req.body.password)
    return res.redirect('/user/'+user._id) // manda el estatus 200 que fue correcto el guardado del usuario  guarda en la base de datos
  })
}

function getUsers (req, res) { // funcion para mostrar todos los usuarios en la base de datos
  User.find({}, (err, users) => { // el metodo find de mongoose es para recorrer la base de datos y traerse el objeto json completo
    if (err) return res.status(500).send({message: `Error 500 petition denegade: ${err}`}) // si se genera un error en la peticion se toma con un estatus 500 que no se puede terminar la peticion
    if (!users) return res.status(404).send({message: 'Not exists users'}) // si la variable que tiene el objeto users esta vacio manda un status 404 quiere decir que no encontro usuarios
    res.status(200).send({users: users})
  })
}

function getUser (req, res) { // funcion para mostrar todos los usuarios en la base de datos
  let userId = req.params.userId
  User.findById(userId, (err, user) => { // el metodo find de mongoose es para recorrer la base de datos y traerse el objeto json completo
    if (err) return res.status(500).send({message: `Error 500 petition denegade: ${err}`}) // si se genera un error en la peticion se toma con un estatus 500 que no se puede terminar la peticion
    if (!user) return res.status(404).send({message: 'Not exists users'}) // si la variable que tiene el objeto users esta vacio manda un status 404 quiere decir que no encontro usuarios
    res.status(200).send({user: user})
  })
}

function signIn (req, res) { // funcion para validar el logeado de los usuarios
  User.findOne({username: req.body.username, password: req.body.password}, (err, user) => { // se manda a buscar el correo en la base de datos
    if (err) return res.status(500).send({ message: err }) // si manda error 500 es que a pasado algo en la peticion
    if (!user) return res.status(404).send({ message: `No existe el usuario` })// si manda error 404 es que no existe este usuario
    
    res.status(200).send({user: user}) // manda estado 200 y envia el mensaje que se a logeado correctamente

  })
}

function updateUser(req, res) { // funcion que actualiza la informacion del usuario

  let userId = req.params.userId
  let update = req.body
  User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
  if (err) return res.status(500).send({message: "Error al acceder al servidor"})

  res.status(200).send({message: "Se a actualizado la información del usuario"})
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

module.exports =
{
  signUp,
  signIn,
  getUsers,
  getUser,
  deleteUser,
  updateUser
}
