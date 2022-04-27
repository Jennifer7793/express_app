// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// server port
var HTTP_PORT = 8000

// start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on %PORT%".replace("%PORT%", HTTP_PORT));
});

// Root endpoint
app.get('/', (req, res, next) => {
  res.json({"message":"Yes, it success!!!!!"})
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

app.get("/api/users/:id", (req, res, next) => {
  var sql = "select * from user where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if(err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message":"success", 
      "data":row
    })
  });
});

app.post("/api/users/", (req, res, next) => {
  var pai = ['m1', 'm1', 'm1', 'm1', 'm2', 'm2', 'm2', 'm2', 'm3', 'm3', 'm3', 'm3', 'm4', 'm4', 'm4', 'm4', 'm0', 'm5', 'm5', 'm5', 'm6', 'm6', 'm6', 'm6', 'm7', 'm7', 'm7', 'm7', 'm8', 'm8', 'm8', 'm8', 'm9', 'm9', 'm9', 'm9', 'p1', 'p1', 'p1', 'p1', 'p2', 'p2', 'p2', 'p2', 'p3', 'p3', 'p3', 'p3', 'p4', 'p4', 'p4', 'p4', 'p0', 'p5', 'p5', 'p5', 'p6', 'p6', 'p6', 'p6', 'p7', 'p7', 'p7', 'p7', 'p8', 'p8', 'p8', 'p8', 'p9', 'p9', 'p9', 'p9', 's1', 's1', 's1', 's1', 's2', 's2', 's2', 's2', 's3', 's3', 's3', 's3', 's4', 's4', 's4', 's4', 's0', 's5', 's5', 's5', 's6', 's6', 's6', 's6', 's7', 's7', 's7', 's7', 's8', 's8', 's8', 's8', 's9', 's9', 's9', 's9', 'z1', 'z1', 'z1', 'z1', 'z2', 'z2', 'z2', 'z2', 'z3', 'z3', 'z3', 'z3', 'z4', 'z4', 'z4', 'z4', 'z5', 'z5', 'z5', 'z5', 'z6', 'z6', 'z6', 'z6', 'z7', 'z7', 'z7', 'z7'];
  var shoupai_1 = pai.sort(() => Math.random() - Math.random()).slice(0, 13).sort();

  function difference(a, b) {
    return [...b.reduce( (acc, v) => acc.set(v, (acc.get(v) || 0) - 1),
            a.reduce( (acc, v) => acc.set(v, (acc.get(v) || 0) + 1), new Map() ) 
    )].reduce( (acc, [v, count]) => acc.concat(Array(Math.abs(count)).fill(v)), [] );
  }

  let pai_123 = difference(pai, shoupai_1)
    
  var shoupai_2 = pai_123.sort(() => Math.random() - Math.random()).slice(0, 13).sort();
 
  let pai_110 = difference(pai_123, shoupai_2)

  var shoupai_3 = pai_110.sort(() => Math.random() - Math.random()).slice(0, 13).sort();
  
  var pai_97 = difference(pai_110, shoupai_3)
  
  var shoupai_4 = pai_97.sort(() => Math.random() - Math.random()).slice(0, 13).sort();
  
  var shan_pai = difference(pai_97, shoupai_4)

  let shoupai4sets = [shoupai_1, shoupai_2, shoupai_3, shoupai_4]

  var errors = []
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.email) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({"error": errors.join(",")});
    return;
  }
  var data = {
    name: shoupai4sets,
    email: req.body.email, 
    password: md5(req.body.password)
  }
  var sql = 'INSERT INTO user(name, email, password) VALUES(?, ?, ?)'
  var params = [data.name, data.email, data.password]
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({"error": err.message})
      return;
    }
    res.json({
      "message": "can get the variable", 
      "data": data,
      "id": this.lastID
    })
  })
})

app.patch("/api/users/:id", (req, res, next) => {
  var data = {
    name: req.body.name, 
    email: req.body.email, 
    password: req.body.password ? md5(req.body.password) :null
  }
  db.run(
    `UPDATE user set
      name = COALESCE(?, name),
      email = COALESCE(?, email), 
      password = COALESCE(?, password)
      WHERE id = ?`,
    [data.name, data.email, data.password, req.params.id],
    function(err, result) {
      if(err) {
        res.status(400).json({"error": res.message})
        return;
      }
      res.json({
        message: "success", 
        data: data, 
        changes: this.changes
      })
  });
})

app.delete("/api/users/:id", (req, res, next) => {
  db.run(
    'DELETE FROM user WHERE if = ?',
    req.params.id,
    function(err, result) {
      if(err) {
        res.status(400).json({"error": res.message})
        return;
      }
      res.json({"message":"deleted", changes: this.changes})
  });
})