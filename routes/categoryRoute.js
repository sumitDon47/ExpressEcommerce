const express = require ('express')
const { testFunction, postCategory, categorylist, categoryList, categoryDetails } = require('../controllers/categoryController')
const router =  express.Router()

router.get('/demo',testFunction)
router.post('/postcategory', postCategory)
router.get('/categorylist', categoryList)
router.get('/categorydetails/:id',categoryDetails)


module.exports = router 
 