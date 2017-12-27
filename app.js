'use strict'
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const pug = require('pug')
const api = require('./routes/index')
const config = require('./config')
const methodOverride = require('method-override')
const formidable = require('express-formidable')
const MongoStore =require('connect-mongo')(session)


app.use(methodOverride('_method'))

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false})) // llamada del middleware bodyParser que busca las rutas y las interpreta

app.use(bodyParser.json()) // para poder utilizar y leer objetos tipo json

app.use(session({
	secret: 'TOP SECRECT',
	resave: true,
	saveUnitialized : true,
	store: new MongoStore ({
		url: config.db,
		autoReconnect: true
	}) 
}))

app.get('/', (req, res) => {
	req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
	res.send(`el nuemero de veces que visitaste la pagina fue ${req.session.cuenta}`)
})

app.use('/', api)

app.set('view engine', 'pug') // configuracion de motor de pantillas

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


module.exports = app
