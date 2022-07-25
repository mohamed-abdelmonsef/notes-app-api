const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const {Api_Key} = process.env ;

var options = {
    auth: {
        api_key: Api_Key
    }
}

module.exports = nodemailer.createTransport(sgTransport(options));