require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const foodRoutes = require('./routes/food')

const app = express()

app.use(cors({
    origin: 'https://fit-fuel.netlify.app/'
}))

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/food', foodRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("connected to db & listening on port", process.env.PORT)
        }) 
    })
    .catch(err => {
        console.error(err)
    })

