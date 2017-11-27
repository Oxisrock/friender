'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceSchema = new Schema({
  title:{type:String, required: true}
  descrption:{type:String, required: true}
  logo:{type:String, default: null}
  salario:{type:Number, required: true}
  fecha:{type:Date, default: Date.now()}

})


module.exports = mongoose.model('services', servicetSchema)// se exporta coleccion service
