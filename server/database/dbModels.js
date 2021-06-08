require("dotenv").config();
const { Pool } = require("pg");

const { PG_URI } = process.env;
const pool = new Pool({ connectionString: PG_URI });
