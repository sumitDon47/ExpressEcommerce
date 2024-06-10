const Product = rewuire('../models/productModel')

//to post/insert product
exports.postProduct = async(req, res) => {
    let product = new Product({
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        countInStock:req.body.countInStock,
        product_description:req.body.product_description,
        product_image:req.body.product_image,
        category:req.body.category
    })
    product = await product.save()
    if(!product){
        return res.status(400).json({error:'something went wromg'})   
    }
    res.send(product)
}