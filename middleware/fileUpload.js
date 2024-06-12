const multer = require('multer')
const fs = require('fs')  //file system help to find directory
const path = require('path')

const storage = multer.diskStorage({  //kaha store garne chinauney 
    destination:(req,file,cb)=>{  //cb= call back function
        let fileDestination = 'public/uploads/'
        //check if directory exist 
        if(!fs.existsSync(fileDestination)){
            fs.mkdirSync(fileDestination,{recursive:true})
            cb(null,fileDestination)
        }
        else{
            cb(null,fileDestination)
        }
    },
    filename:(req,file,cb)=>{
        let filename = path.basename(file.originalname,path.extname(file.originalname))
        //pat.basename('image/foo/abc.jpg)
        //abc
        let ext = path.extname(file.originalname)
        //.jpg
        cb(null,filename+'_'+Date.now()+ext)
    }
})

let imageFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|png|jpeg|svg|JPG|PNG|JPEG|SVG|JFIF|GIF)$/)){
        return cb(new Error('You can upload image file only'),false)
    }
    else{
        cb(null,true)
    }
}

const upload = multer({
    storage:storage,
    fileFilter:imageFilter,
    limits:{
        fileSize:3000000 //3mb
    }
})

module.exports = upload