'use strict'

// imports modelo company
const Company = require('../models/company') 


//crear compañia
function new_company (req, res) { 

const data = req.body
const company = new Company(data) 

//Guardar coḿpañia en bd
company.save((err) => { 
  if (err) return res.status(500).send({ message: `Error interno del servidor: ${err}` }) // Error interno del servidor
  console.log('company created')

  return res.status(200).json({company: company}) 
})
}

//mostrar compañias
function getCompanys (req, res) { 
  //recorrer bd
  Company.find({}, (err, companys) => { 
    if (err) return res.status(500).send({message: `Error interno del servidor: ${err}`}) 
    if (!companys) return res.status(404).send({message: 'no se encontraron compañias'}) 
    res.status(200).json({companys: companys})
  })
}

//obtener compañia por Id
function getCompany (req, res) { 
  let companyId = req.params.companyId
  //recorrer bd
  Company.findById(companyId, (err, companys) => { 
    if (err) return res.status(500).send({message: `Error interno del servidor: ${err}`})
    if (!companys) return res.status(404).send({message: 'No existe compañia'}) 
    res.status(200).json({companys: companys})
  })
}

//iniciar sesión
function login (req, res) { 
  //recorrer bd username - password
  Company.findOne({username: req.body.username, password: req.body.password}, (err, company) => { 
    console.log(company)
    if (err) return res.status(500).send({ message: err }) // si manda error 500 es que a pasado algo en la peticion
    if (!company) return res.status(404).send({ message: `Compañia no existe` })// si manda error 404 es que no existe este usuario
    req.session.company_id = company._id
    req.session.username = company.username
    req.session.nickname = company.nickname
    console.log(req.session.username);
    res.status(200).json({company: company}) // manda estado 200 y envia el mensaje que se a logeado correctamente

  })
}

//borrar codigo cuando se tengan las vistas
function view_update_company (req, res) {
  //recorrer bd
  Company.findById(req.params.companyId, (err, company) => {
    if (err) return res.status(500).send({ message: `Error al buscar oferta: ${err}` })
    if (!company) return res.status(404).send({message: 'No existe ninguna oferta'})
    res.render('companys/edit_company', {company: company})
  })
}

//Actualizar datos en colección company
function updateCompany(req, res) { 

  let companyId = req.params.companyId
  let update = req.body
  //recorrer bd
  Company.findByIdAndUpdate(companyId, update, (err, companyUpdate) => {
    if (err) return res.status(500).send({message: "Error al acceder al servidor"})

    res.status(200).json(({companyUpdate: companyUpdate}),{message: "Se a actualizado la información de la empresa"})
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
  deleteCompany,
  view_update_company
}
