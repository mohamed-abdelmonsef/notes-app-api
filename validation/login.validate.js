const {body} = require('express-validator')

module.exports = [
    body('email').isEmail(),
    body('password').matches("^(?=.*[0-9])")
]