const{check,validationResult}=require('express-validator')

exports.categoryValidation = [
    check('category_name','category is required').notEmpty()
    .isLength({min:3}).withMessage('category name must be of at least 3 characters')
]

exports.productValidation=[
    check('product_name','product name is required').notEmpty()
    .isLength({min:3}).withMessage('product name must be of at least 3 characters'),

    check('product_price','price is required').notEmpty()
    .isNumeric().withMessage('price must be a numeric value'),

    check('countInStock','stock is required').notEmpty()
    .isNumeric().withMessage('stock must be a numeric value'),

    check('product_description','description is required').notEmpty()
    .isLength({min:20}).withMessage('Description muct be at least of 20 charactres or more'),

    check('category','category is required').notEmpty()
]

exports.validation = (req,res,next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        next()
    }
    else{
        return res.status(400).json({error:errors.array()[0].msg})
    }
}