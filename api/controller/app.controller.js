import pool from '../utils/database.js';

const dbname = 'students_info';

const createUser = (req, res) => {
  const {
    name, birthday, admission, faculty,
  } = req.body;
  pool.query(
    `INSERT INTO ${dbname} (name, birthday, admission, faculty) values ($1, $2, $3, $4) RETURNING * `,
    [name, birthday, admission, faculty],
    (error, result) => {
      if (error) throw error;
      console.log('Create User');
      res.status(201).json({
        message: 'User created successfully!',
        user: result,
      });
    },
  );
};

const getUsers = (req, res, next) => {
  pool.query(
    `SELECT * FROM ${dbname}`,
    (error, results) => {
      if (error) next(error);
      res.status(200).json(results.rows);
    },
  );
};

const getOneUser = (req, res, next) => {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM ${dbname} WHERE id = $1`,
    [id],
    (error, results) => {
      if (!results.rows.length) {
        console.log('User not found!');
        res.status(404).json({ message: 'User not found!' });
        next(error);
      }
      res.status(200).json(results.rows);
    },
  );
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const {
    name, birthday, admission, faculty,
  } = req.body;
  pool.query(
    `UPDATE ${dbname} SET name = $1, birthday = $2, admission = $3, faculty = $4 WHERE id = $5 RETURNING *`,
    [name, birthday, admission, faculty, id],
    (error, result) => {
      if (!result.rows.length) { res.status(404).json({ message: 'User not found!' }); }
      res.status(200).json({ message: 'User updated!', user: result.rows[0] });
    },
  );
};

const deleteUser = (req, res, next) => {
  const { id } = req.params;
  pool.query(`DELETE FROM ${dbname} WHERE id = $1`, [id], (error, result) => {
    if (result.rows.length) {
      res.status(404).json({ message: 'User not found!' });
      next(error);
    }
    res.status(200).json({ message: 'User deleted!' });
  });
};

export default {
  createUser, getUsers, getOneUser, updateUser, deleteUser,
};
