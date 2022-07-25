const {validationResult} = require('express-validator')
const userModel = require('../models/user.model')


//Here we validate and check the inputs to make sure they won't harm the server .
//next we check if this email address already registered before .
//and if already registered but didn't confirm , he can register


module.exports = (req,res,next)=>{
    let validErrors = validationResult(req)
    if (validErrors.isEmpty()) {
        userModel.findOne({email:req.body.email}).exec((err,user)=>{
            if (err) {
                return res.status(500).send({message:'db error',Error:err})
            }
            if (user) {
                if (user.emailConfirm) {
                    return res.status(400).send({message:'this email is already exist..!!'})   
                }
            }
            next()
        })
    } else {
        return res.status(422).send({message:"invalid inputs",Errors:validErrors.array()})
    }
}