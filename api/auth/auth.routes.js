const express = require('express')
const {requireAuth}  = require('../../middlewares/requireAuth.middleware')
const {login, signup, logout} = require('./auth.controller')

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
// router.post('/logout', requireAuth, logout)
router.post('/logout', logout)

module.exports = router