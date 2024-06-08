const Category = require('../models/categoryModel')

exports.testFunction = (req,res) => {
    res.send('This is a from the category controller')
} 

//To insert insert the category
exports.postCategory = async(req,res)=>{
    let category = new Category({
        category_name:req.body.category_name
    })
    category = await category.save()
    if(!category){
        return res.status(400).json({error: "Something went wrong"})
    }
    res.send(category)
}

//to retrive all data
exports.categoryList = async(req,res)=>{
    const category = await Category.find()
    if(!category){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(category)
}

//to view category details
exports.categoryDetails = async(req,res)=>{
    const category = await Category.findById(req.params.id)
    if(!category){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(category)
}
