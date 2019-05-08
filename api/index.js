const express = require('express')
var bodyParser = require('body-parser');

// Create express instnace
const app = express()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Require API routes
const register = require('./routes/register')

// Import API Routes
app.use(register)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
