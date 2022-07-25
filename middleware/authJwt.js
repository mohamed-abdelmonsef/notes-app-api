const jwt = require('jsonwebtoken')
const {Secret_Key} = process.env ;

module.exports = (req,res,next)=>{
    let token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({message:"no token provided..!"})
    }
    jwt.verify(token,Secret_Key,(err,decoded)=>{
        if (err) {
            return res.status(401).send({message:"Unauthorized"})
        }
        req.userId = decoded.id
        next()
    })
}