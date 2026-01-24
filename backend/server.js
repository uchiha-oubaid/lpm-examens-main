const cors = require("cors");
const express = require("express");
const app = express();

// FOR ADMINS 

app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:8080", "http://127.0.0.1:8080"]
}));

// for json parsing
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Data Sent!");
});

app.post('/new/admin', (req, res) => {
    const {username, email, number, password, passwordO, code} = req.body;  // This is the data from the client
    console.log('Server says: ', username); // this is where the data will be accessed!
});

app.listen(3000, () => {
    console.log("Server Started!");
});
