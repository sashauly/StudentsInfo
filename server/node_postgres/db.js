const { password } = require('pg/lib/defaults');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'node_postgres',
});

module.exports = pool;
