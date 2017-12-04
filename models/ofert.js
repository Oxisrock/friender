'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfertSchema = new Schema({
  title:{type:String, required: true},
  description:{type:String, required: true},
  price:{type:String, required: true},
  date_top:{type:Date, required: true},
  creator:{type:Schema.Types.ObjectId, ref: "Company"}

})


module.exports = mongoose.model('Oferts', OfertSchema)// se exporta coleccion User
