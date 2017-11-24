'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfertSchema = new Schema({
  title:{type:String, required: true}
})


module.exports = mongoose.model('Oferts', OfertSchema)// se exporta coleccion User
