const express = require('express')
const { postProduct } = require('../controllers/productController')
const router = express.Router()

router.post('/postproduct',postProduct)




module.exports = router