const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const height = require('./routes/height')

// Import API Routes
app.use(height)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
