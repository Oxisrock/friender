'use strict'

const Service = require('../models/service') 


function create_service (req, res) { // se crea la funcion signUp que recibe un requerimiento y manda una respuesta
  const data = req.body // se guarda todos los datos del body en una constante

  const service = new Service(data) // se crea nuevo usuario
  service.save((err) => { // se guarda el usuario en la base de datos
    if (err) return res.status(500).send({ message: `Error al registrar oferta: ${err}` }) // si paso algun error a mandar a guardar
    console.log('Servicio guardado')
    res.redirect('/service/'+service.id) // manda el estatus 200 que fue correcto el guardado del usuario  guarda en la base de datos
  })

}

function get_service (req, res) {
  Service.findById(req.params.serviceId, (err, service) => {
    if (err) return res.status(500).send({ message: `Error al buscar servicio: ${err}` })
    if (!service) return res.status(404).send({message: 'No existe ninguna servicio'})
    res.render('services/show_service', {service: service})
  })
}

function get_services (req, res) {
  Service.find({}, (err, services) => {
    if (err) return res.status(500).send({ message: `Error al buscar servicio: ${err}` })
    if (!services) return res.status(404).send({message: 'No existe ningun servicio'})
    res.status(200).render('services',{services: services})
  })
}



//buscar servicio

function view_update_service (req, res) {
  let serviceId = req.params.serviceId
  Service.findById(serviceId, (err, service) => {
    if (err) return res.status(500).send({ message: `Error al buscar oferta: ${err}` })
    if (!service) return res.status(404).send({message: 'No existe ningun1 servicio'})
    res.render('services/edit_service', {service: service})
  })
}


//actualizar servicio
function update_service (req, res) {
  let serviceId = req.params.serviceId
   console.log(req.params)
  let update = req.body
  console.log(serviceId, update)
  Service.findByIdAndUpdate(req.params.serviceId, update, (err, service) => {
    if (err) return res.status(500).render('services/edit_service', {service: service})
    if (!service) return res.status(404).send({message: 'No existe ningun servicio1'})
    
    res.status(200).render('services/show_service', {service: service})
  })
}

function deleteService (req, res) { //funcion que borra registro de usuario
  Service.findById(req.params.serviceId, (err, user) => {
  if (err) return res.status(500).send({message: 'Error al acceder al servidor'})

  user.remove(err => {
    if (err) return res.status(500).send({message: 'Error al acceder al servidor'})
    res.status(200).send({message: ` Servicio borrado`})
  })
  })
}


//se exportan funciones del controlador
module.exports =
{
  create_service, 
  get_service,
  get_services,
  update_service,
  view_update_service,
  deleteService
 
}
