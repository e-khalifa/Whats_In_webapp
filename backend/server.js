require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const foodRoutes = require('./routes/food')

//express app
const app = express()

//middleware: any code that excutes between us getting a request on the server and us sending a response
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/food/', foodRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connecting db and listening on port ', process.env.PORT)
        })
    })
    .catch((error) => { console.log(error) })

