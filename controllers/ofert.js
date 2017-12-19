'use strict'
const Ofert = require('../models/ofert')


//Crear oferta
function create_ofert (req, res) { 

  console.log(res.locals.username);

  const data = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    date_top: req.body.date_top,
    creator: res.locals.company._id
  } 

  const ofert = new Ofert(data) 
  //guardar usuario
  ofert.save((err) => { 
    if (err) return res.status(500).send({ message: `Error al registrar oferta: ${err}` }) // si paso algun error a mandar a guardar
    console.log('oferta creada')
    console.log(ofert);
    res.status(200).json({ofert: ofert})
  })
}

//obetener oferta por ID
function get_ofert (req, res) {
  Ofert.findById(req.params.ofertsId, (err, ofert) => {
    if (err) return res.status(500).send({ message: `Error al buscar oferta:: ${err}` })
    if (!ofert) return res.status(404).send({message: 'No existe ninguna oferta'})
    res.status(200).json({ofert: ofert})
  })
}

//obetener todas las ofertas
function get_oferts (req, res) {
  Ofert.find({}, (err, oferts) => {
    if (err) return res.status(500).send({ message: `Error al buscar oferta: ${err}` })
    if (!oferts) return res.status(404).send({message: 'No existe ninguna oferta'})
    res.status(200).json({oferts: oferts})
  })
}

//quitar vista
function view_update_ofert (req, res) {
  Ofert.findById(req.params.ofertsId, (err, ofert) => {
    if (err) return res.status(500).send({ message: `Error al buscar oferta: ${err}` })
    if (!ofert) return res.status(404).send({message: 'No existe ninguna oferta'})
    res.render('oferts/edit_ofert', {ofert: ofert})
  })
}

// Actualizar oferta
function update_ofert (req, res) {
  let ofertsId = req.params.ofertsId
  let update = req.body
  Ofert.findByIdAndUpdate(req.params.ofertsId, update, (err, ofert) => {
    if (err) return res.status(500).render('oferts/edit_ofert', {ofert: ofert})
    if (!ofert) return res.status(404).send({message: 'No existe ninguna oferta'})
    else {
      res.status(200).json({ofert: ofert})
    }
    
  })
}

//Eliminar oferta
function delete_ofert (req, res) {
  Ofert.findOneAndRemove(req.params.ofertsId, (err, ofert) => {
    if (err) return res.status(500).send({ message: `Error al buscar oferta: ${err}` })
    if (!ofert) return res.status(404).send({message: 'No existe ninguna oferta'})
    res.status(200).json({ofert: ofert})
  })
}



//se exportan funciones

module.exports =
{
  create_ofert, 
  get_ofert,
  get_oferts,
  update_ofert,
  view_update_ofert,
  delete_ofert
}
