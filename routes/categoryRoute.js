const express = require ('express')
const { testFunction, postCategory, categorylist, categoryList, categoryDetails, updateCategory, deleteCategory } = require('../controllers/categoryController')
const router =  express.Router()
const {categoryValidation, validation} = require('../validation/validator')

router.get('/demo',testFunction)
router.post('/postcategory', categoryValidation,validation, postCategory)
router.get('/categorylist', categoryList)
router.get('/categorydetails/:id',categoryDetails)
router.put('/updatecategory/:id',updateCategory)
router.delete('/deletecategory/:id', deleteCategory)


module.exports = router 
 