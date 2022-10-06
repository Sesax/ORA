const Parcelle = require('../models/parcelleModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

const getParcelles = async (req, res) => {
    const user_id = req.user._id

    const parcelles = await Parcelle.find({ user_id })

    res.status(200).json(parcelles)
}

const getParcellesInRange = async (req, res) => {

    const { id } = req.params

    const p = await Parcelle.findById(id)

    if (!p) {
        return res.status(404).json({ error: "Aucune parcelle correspondante" })
    }
    const X1 = p.latitude
    const Y1 = p.longitude
    const parcelles = await Parcelle.find()

    const offers = []

    parcelles.forEach(function (parcelle, i) {
        const X2 = parcelle.latitude
        const Y2 = parcelle.longitude

        const D = Math.acos(Math.sin(radians(X1)) * Math.sin(radians(X2)) + Math.cos(radians(X1)) * Math.cos(radians(X2)) * Math.cos(radians(Y1 - Y2))) * 6371
        if (D < 30 && parcelle.user_id != p.user_id) {
            offers.push(parcelle)
        }
    })

    res.status(200).json(offers)
}

function radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

const getParcelle = async (req, res) => {
    const { id } = req.params

    const parcelle = await Parcelle.findById(id)

    if (!parcelle) {
        return res.status(404).json({ error: 'Cette parcelle n\'existe pas' })
    }

    res.status(200).json(parcelle)
}

const addParcelle = async (req, res) => {
    const { latitude, longitude, superficie } = req.body

    let emptyFileds = []

    if (!latitude) {
        emptyFileds.push('latitude')
    }
    if (!longitude) {
        emptyFileds.push('longitude')
    }
    if (!superficie) {
        emptyFileds.push('superficie')
    }
    if (emptyFileds.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFileds })
    }

    try {
        const user_id = req.user._id
        const status = 0
        const parcelle = await Parcelle.create({ latitude, longitude, superficie, status, user_id })
        res.status(200).json(parcelle)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteParcelle = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Pas de parcelle correspondante' })
    }

    const parcelle = await Parcelle.findOneAndDelete({ _id: id })

    if (!parcelle) {
        return res.status(404).json({ error: 'Pas de parcelle correspondante' })
    }

    res.status(200).json(parcelle)
}

const updateParcelle = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Pas de parcelle correspondante' })
    }

    const parcelle = await Parcelle.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!parcelle) {
        return res.status(404).json({ error: 'Pas de parcelle correspondante' })
    }

    res.status(200).json(parcelle)
}

module.exports = {
    addParcelle,
    getParcelles,
    getParcelle,
    deleteParcelle,
    updateParcelle,
    getParcellesInRange
}