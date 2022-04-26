// Create express app
var express = require("express")
var app = express()

// server port
var HTTP_PORT = 3000

// start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on %PORT%".replace("%PORT%", HTTP_PORT));
});

// Root endpoint
app.get('/', (req, res, next) => {
  res.json({"message":"Ok"})
});

// Default response for any other request 
app.use(function(req, res) {
  res.status(404);
});