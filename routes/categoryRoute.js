const express = require ('express')
const { testFunction } = require('../controllers/categoryController')
const router =  express.Router()

router.get('/demo',testFunction)


module.exports = router 
 