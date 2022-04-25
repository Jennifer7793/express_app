// Require packages and define server related variables
const express = require('express')
const app = express()
const port = 3000

// Set routes
app.get('/', (req, res) => {
  res.send('This is my first Express Web App')
})

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
})