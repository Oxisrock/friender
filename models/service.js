'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema


//coleccion service
const serviceSchema = new Schema({
  title:{type:String, required: true},
  description:{type:String, required: true},
  logo:{type:String, default: null},
  salary:{type:Number, required: true},
  fecha:{type:Date, default: Date.now()},
  creator:{type:Schema.Types.ObjectId, ref: "User"}

})


module.exports = mongoose.model('service', serviceSchema)// se exporta coleccion service
