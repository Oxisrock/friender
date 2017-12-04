'use strict'

const express = require ('express')
const api = express.Router()
const companyCtrl = require('../controllers/company')
const userCtrl = require('../controllers/user')
const ofertCtrl = require('../controllers/ofert')
const finder_oferts = require('../middlewares/find_oferts')
api.get('/',userCtrl.home)

//rutas modelo company
api.post('/sign', companyCtrl.signUp)
api.get('/companys', companyCtrl.getCompanys)
api.get('/company/:companyId', companyCtrl.getCompany)
api.post('/logini', companyCtrl.signIn)
api.get('/logini', (req, res) => {
  res.render('logincompany')
})
api.get('/sign', (req, res) => {
  res.render('registrocompany')
})
api.put('/company/:companyId', companyCtrl.updateCompany)
api.delete('/company/:companyId', companyCtrl.deleteCompany)

//rutas modelo user
api.post('/signup', userCtrl.signUp) // ruta para el registro de usuarios
api.get('/users', userCtrl.getUsers)
api.get('/user/:userId', userCtrl.getUser) // petion get para mostrar un producto especificado por su ID
api.post('/login', userCtrl.signIn)
api.get('/login', (req, res) => {
  res.render('login')
})
api.get('/signup', (req, res) => {
  res.render('registro')
})
api.put('/users/:userId', userCtrl.updateUser)
api.delete('/user/:userId', userCtrl.deleteUser)

//ofertas

api.route('/ofert/new')
  .get((req, res) => {
    res.render('oferts/new_ofert')
  })

api.route('/oferts')
  .get(ofertCtrl.get_oferts)
  .post(ofertCtrl.create_ofert)

api.route('/ofert/:ofertsId/edit')
  .get(ofertCtrl.view_update_ofert)

api.all('/ofert/:ofertsId*', finder_oferts)

api.route('/ofert/:ofertsId')
  .get(ofertCtrl.get_ofert)
  .put(ofertCtrl.update_ofert)
  .delete(ofertCtrl.delete_ofert)
// vistas


/*
  APIRESTFULL
  GET = Peticion para pedirle algo al servidor
  POST = Peticion para enviarle lo que sea al servidor
  PUT = Peticion para sobrescribir o editar cualquier informacion en el servidor
  DELETE = Peticion para borrar algo que este en el servidor
*/
/*
  codigos de estado
  200 = la respuesta son correctas y la peticion ha sido procesada correctamente
  300 = respuestas de redireccion el cliente necesita mas acciones para finalizar la Peticion
  400 = Errores por el cliente en el servidor
  500 = Errores por el servidor quiere decir que el servidor esta fallando
*/


module.exports = api
