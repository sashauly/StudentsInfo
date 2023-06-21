import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  database: process.env.PG_DB,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Error:', err);
});

export default pool;
