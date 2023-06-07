const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//routes

//create
app.post('/book', async(req, res) => {
    try {
        console.log(req.body)
    } catch (err) {
        console.error(err.message);
    }
});
//get all
app.get("/book", async(req, res) => {
    try {
        const allBooks = await pool.query("SELECT * FROM Book");
        res.json(allBooks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get 1

//update

//delete

app.listen(5000, () => {
    console.log("server has started on port 5000");
});