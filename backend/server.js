// deno-lint-ignore-file no-unused-vars
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { createPool } = require("mysql");

const db = createPool({
    database: "lpmDataBase",
    host: "localhost",
    user: "oubaid",
    password: "YourPassword123!",
    connectionLimit: 10
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// FOR ADMINS 
app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:8080", "http://127.0.0.1:8080"]
}));

// for json parsing
app.use(express.json());

// Injecting the data to the database
// for the new admin account
app.post('/new/admin', (req, res) => {
  const {username, email, number, password, passwordO, code} = req.body;  // This is the data from the client
  db.query("INSERT INTO lpmDataBase.admin (username, phone_number, email, user_password, code) VALUES (?, ?, ?, ?, ?)",
    [username, number, email, password, code], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(passwordO);
      }
    });
});

// for the new eleve account
app.post('/new/eleve', (req, res) => {
  const {username, email, number, password, passwordO} = req.body;  // This is the data from the client
    db.query("INSERT INTO lpmDataBase.eleve (username, phone_number, email, user_password) VALUES (?, ?, ?, ?)",
      [username, number, email, password], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(passwordO);
        }
      });
});

// for the new parent account
app.post('/new/parent', (req, res) => {
  const {username, email, number, password, passwordO} = req.body;  // This is the data from the client
    db.query("INSERT INTO lpmDataBase.eleve (username, phone_number, email, user_password) VALUES (?, ?, ?, ?)",
      [username, number, email, password], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(passwordO);
        }
      });
});

app.listen(3000, () => {
  console.log("Server Started!");
});
