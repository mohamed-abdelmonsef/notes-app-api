const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    emailConfirm:{type:Boolean ,default:false}
})

module.exports = mongoose.model('user' ,userSchema)