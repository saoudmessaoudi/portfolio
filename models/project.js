const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true
    }, 
    publishedYear : {
        type: String,
        required: true,
        default : "2021"
    }
})

module.exports = mongoose.model('Project', projectSchema)