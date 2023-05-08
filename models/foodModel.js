const mongoose = require('mongoose')

const Schema = mongoose.Schema

const foodSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Food', foodSchema)

