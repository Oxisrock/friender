'use strict'

const express = require ('express')
const api = express.Router()
const companyCtrl = require('../controllers/company')
const userCtrl = require('../controllers/user')
const ofertCtrl = require('../controllers/ofert')

api.get('/',userCtrl.home)

//rutas modelo company

api.route('/companys/new')
  .get((req, res) => {
    res.render('companys/new_company')
  })
api.route('/companys')
  .get(companyCtrl.getCompanys)
  .post(companyCtrl.new_company)

api.route('/companys/login')
  .get((req, res) => {
    res.render('companys/login')
  })
  .post(companyCtrl.login)

api.route('/company/:companyId')
  .get(companyCtrl.getCompany)
  .put(companyCtrl.updateCompany)
  .delete(companyCtrl.deleteCompany)




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

api.route('/ofert/:ofertsId')
  .get(ofertCtrl.get_ofert)
  .put(ofertCtrl.update_ofert)
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
