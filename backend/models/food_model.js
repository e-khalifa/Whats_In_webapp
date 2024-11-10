const mongoose = require('mongoose')

//schema defines the structure of the document to the collection
const Schema = mongoose.Schema

const foodSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: false
    },
    unit: {
        type: String,
        required: false
    }
},
    { timestamps: true })

module.exports = mongoose.model('FoodItem', foodSchema)
