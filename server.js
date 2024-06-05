const express = require('express')
const app = express()
require('dotenv').config()

const categoryRoute = require('./routes/categoryRoute')

//routes
app.use('/api', categoryRoute)

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})



