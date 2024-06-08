const express = require ('express')
const { testFunction, postCategory, categorylist, categoryList, categoryDetails, updateCategory, deleteCategory } = require('../controllers/categoryController')
const router =  express.Router()

router.get('/demo',testFunction)
router.post('/postcategory', postCategory)
router.get('/categorylist', categoryList)
router.get('/categorydetails/:id',categoryDetails)
router.put('/updatecategory/:id',updateCategory)
router.delete('/deletecategory/:id', deleteCategory)

module.exports = router 
 