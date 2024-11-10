require('dotenv').config()

//import express framework to create a server and handle HTTP requests
const express = require('express')

// Import Mongoose to interact with MongoDB
const mongoose = require('mongoose')
const foodRoutes = require('./routes/food')

const app = express()

//middleware: any code that excutes between us getting a request on the server and us sending a response
// as it parse incoming JSON requests; without this, req.body will be undefined for JSON data
app.use(express.json())
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next() //pass control
})

//base path
app.use('/api/food/', foodRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connecting db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    })    