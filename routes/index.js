'use strict'

const express = require ('express')
const fs = require('fs')
const api = express.Router()
const companyCtrl = require('../controllers/company')
const userCtrl = require('../controllers/user')
const ofertCtrl = require('../controllers/ofert')
//const finder_oferts = require('../middlewares/find_oferts')
const serviceCtrl = require('../controllers/service')


// Home
/*api.route('/')
  .get((req, res) => {
    res.render('')
  }) */
//Rutas modelo company
api.route('/companys')
  .get(companyCtrl.getCompanys)
  .post(companyCtrl.new_company)
api.route('/companys/new')
  .get((req, res) => {
    res.render('companys/new_company')
  })
api.route('/companys/login')
  .get((req, res) => {
    res.render('companys/login')
  })
  .post(companyCtrl.login)
api.route('/company/:companyId')
  .get(companyCtrl.getCompany)
  .put(companyCtrl.updateCompany)
  .delete(companyCtrl.deleteCompany)

///////////////////////////////////////////////////////////////////////

//Rutas modelo user
api.route('/users')
  .post(userCtrl.new_user)
  .get(userCtrl.getUsers)

api.route('/users/new')
  .get((req, res) => {
    res.render('users/new_user')
  })

api.route('/users/login')
  .get((req, res) => {
    res.render('/users/login')
  })
  .post(userCtrl.login)

api.route('/user/:userId')
  .get(userCtrl.getUser)
  .put(userCtrl.updateUser)
  .delete(userCtrl.deleteUser)

///////////////////////////////////////////////////////////////////////
// Rutas modelo ofertas
api.route('/ofert/new')
  .get((req, res) => {
    res.render('oferts/new_ofert')
  })

api.route('/oferts')
  .get(ofertCtrl.get_oferts)
  .post(ofertCtrl.create_ofert)

api.route('/ofert/:ofertsId/edit')
  .get(ofertCtrl.view_update_ofert)

//api.all('/ofert/:ofertsId*', finder_oferts)

api.route('/ofert/:ofertsId')
  .get(ofertCtrl.get_ofert)
  .put(ofertCtrl.update_ofert)
  .delete(ofertCtrl.delete_ofert)
// vistas


///////////////////////////////////////////////////////////////////////
// Rutas modelo servicios
api.route('/service/new')
  .get((req, res) => {
    res.render('services/new_service')
  })

api.route('/services')
  .get(serviceCtrl.get_services)
  .post(serviceCtrl.create_service)

api.route('/services/:serviceId/edit')
  .get(serviceCtrl.view_update_service)

api.route('/service/:serviceId')
  .get(serviceCtrl.get_service)
  .put(serviceCtrl.update_service)
  .delete(serviceCtrl.deleteService)


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
