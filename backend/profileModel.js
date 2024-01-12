const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profileModel = new Schema({
    firstname : {
        type : String,
        required : true
    },

    lastname : {
        type : String,
        required : true
    },
    jobtitle : {
        type : String,
        required : true
    },
    pay : {
        type : Number,
        required : true
    },
    onholiday : {
        type : Boolean,
        required : true
    },
},{timestamps: true})
module.exports = mongoose.model('profile', profileModel)