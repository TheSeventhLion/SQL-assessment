const express = require('express')
, bodyParser = require('body-parser')
, cors = require('cors')
, massive = require('massive');

const mainCtrl = require('./mainCtrl');
const app = express();
var db = app.get('db');


app.use(bodyParser.json())
app.use(cors());

// You need to complete the information below to connect
// to the assessbox database on your postgres server.
massive({
  host: 'localhost',
  port: 5432,
  database: 'assessbox',
  user: '',
  password: ''
}).then( db => {
  app.set('db', db);

  // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then( response => {
    console.log('User table initialized');
    db.init_tables.vehicle_create_seed().then( response => {
      console.log('Vehicle table initialized');
    })
  })

})

// ===== Build enpoints below ============

app.get("/api/users", (req, res, next) => {
  const db = app.get("db");
  db.get_all_users()
    .then(response => res.json(response))
    .catch(err => console.log(err));
});
// ===================================================
app.get("/api/vehicles", (req, res, next) => {
  const db = app.get("db");
  db.get_all_vehicles()
    .then(response => res.json(response))
    .catch(err => console.log(err));
});
// ===================================================
app.post("/api/users", (req, res, next) => {
  const db = app.get("db");
  db.post_user([req.body.name, req.body.email])
    .then(response => res.json(response))
    .catch(err => console.log(err));
});
// ===================================================
app.post("/api/vehicles", (req, res, next) => {
  const db = app.get("db");
  db.post_vehicle([
      req.body.make,
      req.body.model,
      req.body.year,
      req.body.owner_id
    ])
    .then(response => res.json(response))
    .catch(err => console.log(err));
});
// ===================================================
app.get("/api/user/:userId/vehiclecount", (req, res, next) => {
  const db = app.get("db");
  db.get_count_of_cars([req.params.userId])
    .then(response => res.json(response))
    .catch(err => console.log(err));
});
// ===================================================
app.get("/api/user/:userId/vehicle", (req, res, next) => {
  const db = app.get("db");
  db.get_vehicles_by_id([req.params.userId])
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => console.log(err));
});
// ===================================================
app.get("/api/vehicle", (req, res, next) => {
  const db = app.get("db");
  if (req.query.userEmail) {
    db.get_vehicles_by_email([req.query.userEmail])
      .then(response => res.json(response))
      .catch(err => console.log(err));
  }
  if (req.query.userFirstStart) {
    db.get_vehicles_by_letters([req.query.userFirstStart] + "%")
      .then(response => res.json(response))
      .catch(err => console.log(err));
  }
});
// ===================================================
app.get("/api/newervehiclesbyyear", (req, res, next) => {
  const db = app.get("db");
  db.get_vehicles_by_year()
    .then(response => res.json(response))
    .catch(err => console.log(err));
});
// ===================================================
app.put("/api/vehicle/:vehicleId/user/:userId", (req, res, next) => {

  db.update_vehicle_owner([req.params.vehicleId, req.params.userId])
    .then(response => res.json(response))
    .catch(err => console.log(err));
});
// ===================================================
app.delete("/api/user/:userId/vehicle/:vehicleId", (req, res, next) => {
  const db = app.get("db");
  db.delete_owner([req.params.userId, req.params.vehicleId])
    .then(response => res.json(response))
    .catch(err => console.log(err));
});
// ===================================================
app.delete("/api/vehicle/:vehicleId", (req, res, next) => {
  const db = app.get("db");
  db.delete_vehicle_by_id([req.params.vehicleId])
    .then(response => res.json(response))
    .catch(err => console.log(err));
});

// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
})




