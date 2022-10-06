const mongoose = require('mongoose')

const Schema = mongoose.Schema

const parcelleSchema = new Schema({
    latitude: {
        type: Number,
        require: true
    },
    longitude: {
        type: Number,
        require: true
    },
    superficie: {
        type: Number,
        require: true
    },
    status: {
        type: Number,
        require: true
    },
    user_id: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Parcelle', parcelleSchema)