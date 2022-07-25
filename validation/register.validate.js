const {body} = require('express-validator')

module.exports = [
    body('name').matches(/^[a-zA-Z ]{2,30}$/),
    body('email').isEmail(),
    body('password').matches("^(?=.*[0-9])"),
    body('confirmPass').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
]