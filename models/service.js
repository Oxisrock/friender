'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceSchema = new Schema({
  title:{type:String, required: true},
  description:{type:String, required: true},
  logo:{type:String, default: null},
  salary:{type:Number, required: true},
  fecha:{type:Date, default: Date.now()}

})


module.exports = mongoose.model('service', serviceSchema)// se exporta coleccion service
