const express = require('express')
var bodyParser = require('body-parser')

// Create express instnace
const app = express()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

// Require API routes
const register = require('./routes/register')
const login = require('./routes/login')
const logout = require('./routes/logout')
const height = require('./routes/height')

// Import API Routes
app.use(height)
app.use(register)
app.use(login)
app.use(logout)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
