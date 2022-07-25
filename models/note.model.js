const mongoose = require('mongoose')
const noteSchema = mongoose.Schema({
    title:String,
    desc:String,
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
})

module.exports = mongoose.model('note',noteSchema)