'use strict'

const Company = require('../models/company') // se manda a llamar a el modelo company.js

function new_company (req, res) { // se crea la funcion signUp que recibe un requerimiento y manda una respuesta
  console.log('POST /Company')
  console.log(req.body)
  const data = req.body //se guarda en un array los datos de la compañia  que nos da el requerimiento
   /* name: req.body.name, 
    nit: req.body.nit,
    place_fundation: req.body.place_fundation,
    email: req.body.email, 
    tel: req.body.tel,
    username: req.body.username,
    nickname: req.body.nickname, 
    password: req.body.password,
    fundation: req.body.fundation, 
    typeOfCompany: req.body.typeOfCompany,
    residence: req.body.residence
    class_company: req.body.class_company,
    tel_home: req.body.tel_home,
  }
*/
  const company = new Company(data) // se guarda todos los datos almacenados en una constante y se manda a guardar esta constante
  company.save((err) => { // se manda a guardar la compañia en la base de datos
    if (err) return res.status(500).send({ message: `Error al crear Compañia: ${err}` }) // si paso algun error a mandar a guardar
    console.log('company created')
    return res.status(200).send({message: 'compañia creada'}) // manda el estatus 200 que fue correcto el guardado del usuario  guarda en la base de datos
  })
}

function getCompanys (req, res) { // funcion para mostrar todos los datos del modelo company
  Company.find({}, (err, companys) => { // el metodo find de mongoose es para recorrer la base de datos y traerse el objeto json completo
    if (err) return res.status(500).send({message: `Error 500 petition denegade: ${err}`}) // si se genera un error en la peticion se toma con un estatus 500 que no se puede terminar la peticion
    if (!companys) return res.status(404).send({message: 'Not exists users'}) // si la variable que tiene el objeto users esta vacio manda un status 404 quiere decir que no encontro usuarios
    res.status(200).render('companys',{companys: companys})
  })
}

function getCompany (req, res) { // funcion para mostrar todos los usuarios en la base de datos
  let companyId = req.params.companyId
  Company.findById(companyId, (err, company) => { // el metodo find de mongoose es para recorrer la base de datos y traerse el objeto json completo
    if (err) return res.status(500).send({message: `Error 500 petition denegade: ${err}`}) // si se genera un error en la peticion se toma con un estatus 500 que no se puede terminar la peticion
    if (!company) return res.status(404).send({message: 'Not exists users'}) // si la variable que tiene el objeto users esta vacio manda un status 404 quiere decir que no encontro usuarios
    res.status(200).render('companys/show_company', {company: company})
  })
}

function login (req, res) { // funcion para validar el logeado de los usuarios
  Company.findOne({username: req.body.username, password: req.body.password}, (err, company) => { // se manda a buscar el correo en la base de datos
    console.log(company)
    if (err) return res.status(500).send({ message: err }) // si manda error 500 es que a pasado algo en la peticion
    if (!company) return res.status(404).send({ message: `No existe el usuario` })// si manda error 404 es que no existe este usuario
    res.status(200).render('companys/show_company', {company: company})// manda estado 200 y envia el mensaje que se a logeado correctamente
    
  })
}

function updateCompany(req, res) { // funcion que actualiza la informacion del usuario

  let companyId = req.params.companyId
  let update = req.body
  Company.findByIdAndUpdate(companyId, update, (err, companyUpdate) => {
  if (err) return res.status(500).send({message: "Error al acceder al servidor"})

  res.status(200).send({message: "Se a actualizado la información de la empresa"})
  }
  )
}

function deleteCompany(req, res) { //funcion que borra registro de usuario
  let companyId = req.params.companyId
  console.log('entra en esta funcion')

  Company.findById(req.params.companyId, (err, company) => {
  if (err) return res.status(500).send({message: 'Error al acceder al servidor'})
 
  company.remove(err => {
    if (err) return res.status(500).send({message: 'Error al acceder al servidor'})
    res.status(200).send({message: `Registro eliminado`})
  })
  })
}




module.exports =
{
  new_company, // palabra reservada para llamar a la funcion signUp
  login,
  getCompanys, // palabra reservada para llamar a la funcion getUsers
  getCompany,
  updateCompany,
  deleteCompany
}
