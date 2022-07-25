const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

require('dotenv').config()

//Start of routes
require('./routes/auth.route')(app)
require('./routes/home.route')(app)
//End of routes

//Start of documentation
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('./documentation/api.yaml')
app.use('/api-docs',swaggerUi.serve ,swaggerUi.setup(swaggerJsDocs))
//End of documentation

//Database connection
require('./config/dbConnet').connect()
//the end of Database connection

const port = process.env.PORT || 3000
app.listen(port ,()=>{
    console.log(`server is working on port ${port}`);
})