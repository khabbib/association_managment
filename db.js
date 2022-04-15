const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "habib.t1121",
    host:"localhost",
    port: 5432,
    database: "UMS"
})

module.exports = pool;