if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}
const cors = require('cors')
const express = require('express')
const router = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000
const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB, {useNewUrlParser:true})
.then((response)=>{
    console.log('Connected to Database')
})
.catch((err)=>{
    console.log('Failed connect to Database')
})

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cors())
app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('Running on Port', PORT)
})