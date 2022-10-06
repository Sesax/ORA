const express = require('express')

// controller fonctions
const {
    addParcelle,
    deleteParcelle,
    updateParcelle,
    getParcelle,
    getParcelles,
    getParcellesInRange
} = require('../controllers/parcelleController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getParcelles)

router.get('/:id', getParcelle)

router.get('/InRange/:id', getParcellesInRange)

router.post('/', addParcelle)

router.delete('/:id', deleteParcelle)

router.patch('/:id', updateParcelle)

module.exports = router