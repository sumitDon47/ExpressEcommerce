const express = require('express')
const { postProduct, productList, productDetails, updateProduct, deleteProduct } = require('../controllers/productController')
const router = express.Router()
const upload = require('../middleware/fileUpload')
const{productValidation, validation} = require('../validation/validator')

router.post('/postproduct',upload.single('product_image'),productValidation,validation,postProduct)
router.get('/productlist', productList)
router.get('/productdetails/:id',productDetails)
router.put('/updateproduct/:id', updateProduct)
router.delete('./deleteproduct/:id',deleteProduct)

module.exports = router