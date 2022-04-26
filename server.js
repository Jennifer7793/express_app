// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")

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

app.get("/api/users", (req, res, next) => {
  var sql = "select * from user"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message":"success", 
      "data": rows
    })
  });
});