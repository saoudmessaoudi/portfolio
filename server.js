require('dotenv').config

const express = require('express')
const app = express()
const mongoose = require('mongoose') 

//replace mongo connection string by process.env.DATABASE_URL
mongoose.connect("mongodb://localhost/projects",{ useUnifiedTopology: true },  {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


app.use(express.json())

const projectsRouter = require('./routes/projects')
app.use('/projects', projectsRouter)

app.listen(2000, () => console.log('Server started'))