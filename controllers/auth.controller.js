const mailer = require('../emails/setupMailer')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const {validationResult} = require('express-validator')
const { Secret_Key } = process.env;


//Start of Register
exports.register = (req,res)=>{
    const {name,email,password} = req.body
    //start of hashing passwords
    bcrypt.hash(password,7,async(err,hash)=>{
        if (err) {
            return res.status(500).send({message:"error in hashing password",error:err});
        }
        //start of sending confirmation email
        let token = jwt.sign({email},Secret_Key)
        let emailContent = {
            from: 'mo7medno7@gmail.com', // sender address
            to: email, 
            subject: "Hello ✔",
            text: "Hello world?", 
            html: `<h1><a href='http://localhost:3000/verifyEmail/${token}'> please click here to confirm your email.. </a></h1>`, // html body
        }
        mailer.sendMail(emailContent,(err, res)=> {
            if (err) { 
                return res.status(500).send({message:"error in sending confirmation mail",error:err}) 
            }
        });
        //start of insert data in database
        await userModel.insertMany({name,email,password:hash})
        res.status(201).send({message:'user registered'}) 

    })
}
//End of Register


//Start of Confirm-Email
exports.confirmEmail = (req,res)=>{
    try {
        const {token} = req.params
        if(token && token!==null && token!==undefined){
            jwt.verify(token ,Secret_Key ,async(err,decoded)=>{
                if (err) {
                    return res.status(401).send({message:"unauthorized"})
                }
                
                await userModel.findOneAndUpdate({email:decoded.email},{emailConfirm:true})
                res.status(200).send({message:'confirmed successfully'})
            })
        }else{
            return res.send(403).send({message:"no token provided"})
        }
    } catch (error) {
        return res.status(500).send({message:"catch error in confirm-mail controller",error :error})
    }
}
//End of Confirm-Email


//Start of Login 
exports.login = (req,res)=>{
    const {email,password} = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).send({message:"invalid inputs",Errors:errors.array()})
    }

    userModel.findOne({email}).exec(async(err,user)=>{
        if (err) {
            return res.status(500).send({message:"DB error during login",error:err})
        }
        if(!user){
            return res.status(404).send({message:"user not found"})
        }
        if(!user.emailConfirm){
            return res.send({message:"please confirm your email first"})
        }
        let match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(401).send({message:"invalid pass",accessToken:null})
        }
        let token = await jwt.sign({id:user._id},Secret_Key,{expiresIn:86400})
        res.status(200).send({
            message:"logged in successfully",
            email:user.email,
            userName:user.name,
            accessToken:token
        })
    })

}
//End of Login 