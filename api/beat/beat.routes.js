const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getBeat, getBeats, deleteBeat, updateBeat, addBeat } = require('./beat.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBeats)
router.get('/:id', getBeat)
router.put('/:id', updateBeat)
router.post('/', addBeat)
router.delete('/:id', deleteBeat)
  
module.exports = router