const Pool = require("pg").Pool;

const pool = new Pool({
    user: "nathan",
    password: "190902",
    host: "localhost",
    port: 5432,
    database: "bookstore"
})

module.exports = pool;