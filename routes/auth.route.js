const authController = require('../controllers/auth.controller')
const validation = require('../validation/index.validate')
const verifyRegister = require('../middleware/verifyRegister')

module.exports = (app)=>{
    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept")
        next()
    })

    app.post('/register',[validation.register,verifyRegister],authController.register)
    
    app.get('/verifyEmail/:token',authController.confirmEmail)

    app.post('/login',[validation.login],authController.login)

}