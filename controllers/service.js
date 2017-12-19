'use strict'

const Service = require('../models/service') 


// crear nuevo servicio
function create_service (req, res) { 
  const data = req.body // 

  const service = new Service(data) 
  //se guarda en bd
  service.save((err) => { 
    if (err) return res.status(500).send({ message: `Error al registrar servicio: ${err}` })
    console.log('Servicio guardado')
    res.status(200).json({service: service}) 
  })

}

//obetener servicio por ID
function get_service (req, res) {
  Service.findById(req.params.serviceId, (err, service) => {
    if (err) return res.status(500).send({ message: `error interno del servidor: ${err}` })
    if (!service) return res.status(404).send({message: 'No existe ninguna servicio'})
    res.status(200).json({service: service})
  })
}

// Obetener todos los servicios
function get_services (req, res) {
  Service.find({}, (err, services) => {
    if (err) return res.status(500).send({ message: `Error interno del servidor: ${err}` })
    if (!services) return res.status(404).send({message: 'No existe ningun servicio'})
    res.status(200).json({services: services})
  })
}

//buscar servicio
function view_update_service (req, res) {
  let serviceId = req.params.serviceId
  Service.findById(serviceId, (err, service) => {
    if (err) return res.status(500).send({ message: `Error interno del servidor: ${err}` })
    if (!service) return res.status(404).send({message: 'No existe ningun servicio'})
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
    if (err) return res.status(500).send({message: 'Error interno del servidor'})
    if (!service) return res.status(404).send({message: 'No existe ningun servicio'})
    
    res.status(200).json({service: service})
  })
}


//eliminar servicio
function deleteService (req, res) { 
  Service.findById(req.params.serviceId, (err, service) => {
  if (err) return res.status(500).json({message: 'Error interno del servidor'})
  if (!service) return res.status(404).json({message: 'Servicio no encontrado'})
  service.remove(err => {
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
