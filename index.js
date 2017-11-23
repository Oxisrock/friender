'use strict'
// donde se iniciara el servidor
const mongoose = require('mongoose')// se hace require de el modulo de mongoose
const app = require('./app') // se hace require de app.js que es donde estan las configuraciones de express
const config = require('./config') // se hace require de config.js es donde estan la url de la db y el puerto

mongoose.connect(config.db, (err, res) => { // llama el metodo connect de mongoose
  if (err) { // si ocurre un Error
    return console.log(`Error al conectar a la base de datos ${err}`) // manda a imprimir en consola
  }
  console.log('Conexion a la base de datos establecida') // manda a imprimir que no hubo error
  app.listen(config.port, function () { // el metodo app.listen de express es el que levanta el servidor
    console.log('aplicacion corriendo en http://localhost :' + config.port) // se manda a imprimir para verificar si el server levanto
  })
})
