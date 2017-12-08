'use strict'
const Ofert = require('../models/ofert')

function create_ofert (req, res) { // se crea la funcion signUp que recibe un requerimiento y manda una respuesta

  console.log(res.locals.username);

  const data = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    date_top: req.body.date_top,
    creator: res.locals.company._id
  } // se guarda todos los datos del body en una constante

  const ofert = new Ofert(data) // se crea nuevo usuario

  ofert.save((err) => { // se guarda el usuario en la base de datos
    if (err) return res.status(500).send({ message: `Error al registrar oferta: ${err}` }) // si paso algun error a mandar a guardar
    console.log('oferta creada')
    //console.log('Email :' + req.body.email)
    //console.log('Password :' + req.body.password)
    console.log(ofert);
    res.redirect('/ofert/'+ofert.id) // manda el estatus 200 que fue correcto el guardado del usuario  guarda en la base de datos
  })
  //se guarda en un array los datos de la compañia  que nos da el requerimiento
}

function get_ofert (req, res) {
  Ofert.findById(req.params.ofertsId, (err, ofert) => {
    if (err) return res.status(500).send({ message: `Error al buscar oferta:: ${err}` })
    if (!ofert) return res.status(404).send({message: 'No existe ninguna oferta'})
    res.render('oferts/show_ofert', {ofert: ofert})
  })
}

function get_oferts (req, res) {
  Ofert.find({}, (err, oferts) => {
    if (err) return res.status(500).send({ message: `Error al buscar oferta: ${err}` })
    if (!oferts) return res.status(404).send({message: 'No existe ninguna oferta'})
    res.status(200).render('oferts',{oferts: oferts})
  })
}

function view_update_ofert (req, res) {
  Ofert.findById(req.params.ofertsId, (err, ofert) => {
    if (err) return res.status(500).send({ message: `Error al buscar oferta: ${err}` })
    if (!ofert) return res.status(404).send({message: 'No existe ninguna oferta'})
    res.render('oferts/edit_ofert', {ofert: ofert})
  })
}

function update_ofert (req, res) {
  let ofertsId = req.params.ofertsId
  let update = req.body
  Ofert.findByIdAndUpdate(req.params.ofertsId, update, (err, ofert) => {
    if (err) return res.status(500).render('oferts/edit_ofert', {ofert: ofert})
    else {
      res.status(200).render('oferts/show_ofert', {ofert: ofert})
    }
    if (!ofert) return res.status(404).send({message: 'No existe ninguna oferta'})
  })
}

function delete_ofert (req, res) {
  Ofert.findOneAndRemove(req.params.ofertsId, (err, ofert) => {
    if (err) return res.status(500).send({ message: `Error al buscar oferta: ${err}` })
    if (!ofert) return res.status(404).send({message: 'No existe ninguna oferta'})
    res.redirect('/oferts')
  })
}





module.exports =
{
  create_ofert, // palabra reservada para llamar a la funcion signUp
  get_ofert,
  get_oferts,
  update_ofert,
  view_update_ofert,
  delete_ofert
  /*get_ofert, // palabra reservada para llamar a la funcion getUsers
  update_ofert,
  delete_ofert
  */
}
