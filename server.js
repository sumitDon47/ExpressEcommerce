const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
require('./db/connection')
const bodyParser = require('body-parser')

const categoryRoute = require('./routes/categoryRoute')


//middleware
app.use(morgan('dev'))
app.use(bodyParser.json()) //to read the json data

//routes
app.use('/api', categoryRoute)

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})


