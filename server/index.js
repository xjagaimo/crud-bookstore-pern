const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//routes

//create
app.post('/bookstore', async(req, res) => {
    try {
        console.log(req.body)
    } catch (err) {
        console.error(err.message);
    }
});
//get all

//get 1

//update

//delete

app.listen(5000, () => {
    console.log("server has started on port 5000");
});