'use strict'
const Ofert = require('../models/ofert')
//const oferts = require('../models/oferts') // se manda a llamar a el modelo company.js


function create_ofert (req, res) { // se crea la funcion signUp que recibe un requerimiento y manda una respuesta
  const data = req.body // se guarda todos los datos del body en una constante

  const ofert = new Ofert(data) // se crea nuevo usuario
  ofert.save((err) => { // se guarda el usuario en la base de datos
    if (err) return res.status(500).send({ message: `Error al registrar oferta: ${err}` }) // si paso algun error a mandar a guardar
    console.log('oferta creada')
    //console.log('Email :' + req.body.email)
    //console.log('Password :' + req.body.password)
    res.redirect('/ofert/'+ofert.id) // manda el estatus 200 que fue correcto el guardado del usuario  guarda en la base de datos
  })
 //se guarda en un array los datos de la compañia  que nos da el requerimiento
}

function get_ofert (req, res) {
  Ofert.findById(req.params.ofertsId, (err, ofert) => {
    res.render('oferts/show_ofert', {ofert: ofert})
  })
}

function get_oferts (req, res) {
  Ofert.find({}, (err, ofert) => {
    res.status(200).send({ofert: ofert})
  })
}



module.exports =
{
  create_ofert, // palabra reservada para llamar a la funcion signUp
  get_ofert,
  get_oferts
  /*get_ofert, // palabra reservada para llamar a la funcion getUsers
  update_ofert,
  delete_ofert
*/
}
