const express = require('express')
var bodyParser = require('body-parser')
const session = require('express-session')

// Create express instnace
const app = express()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(session({
  secret: 'rostik-project',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

// Require API routes
const register = require('./routes/register')
const login = require('./routes/login')

// Import API Routes
app.use(register)
app.use(login)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
