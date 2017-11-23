'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const pug = require('pug')
const api = require('./routes/index')
const cookieSession = require('cookie-session')
const session_middleware = require('./middlewares/session')
const session = require('express-session')

app.use(cookieSession({
  name: "session",
  keys: ["llave-1","llave-2"]
}));

app.use(session({
  secret: '123123',
  resave: false,
  saveUninitialized: false
}))

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false})) // llamada del middleware bodyParser que busca las rutas y las interpreta

app.use(bodyParser.json()) // para poder utilizar y leer objetos tipo json

app.use('/', api)

app.set('view engine', 'pug') // configuracion de motor de pantillas

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


module.exports = app
