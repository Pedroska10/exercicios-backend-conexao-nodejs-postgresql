const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "pedroskt8",
  host: "localhost",
  port: 5432,
  database: "biblioteca",
});

module.exports = pool;
