const mongoose =  require('mongoose')

const categorySchema = new mongoose.Schema({
    category_name:{
        type:String,
        require:true,
        unique:true,
        trim:true,
    }
},{timestamps:true})
//created at
//updated at

module.exports = mongoose.Model('Category', categorySchema)