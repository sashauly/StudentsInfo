import pool from '../utils/database';

const dbname = 'students_info';

const createUser = (req, res) => {
  const { firstname, lastname, patronimic, birthday, admission, faculty } =
    req.body;
  pool.query(
    `INSERT INTO ${dbname} (firstname, lastname, patronimic, birthday, admission, faculty) values ($1, $2, $3, $4, $5, $6) RETURNING * `,
    [firstname, lastname, patronimic, birthday, admission, faculty],
    (error, result) => {
      if (error) throw error;
      console.log('Create User');
      res.status(201).json({
        message: 'User created successfully!',
        user: result.rows
      });
    }
  );
};

const getUsers = (req, res, next) => {
  pool.query(`SELECT * FROM ${dbname}`, (error, results) => {
    if (error) next(error);
    res.status(200).json(results.rows);
  });
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
    }
  );
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, patronimic, birthday, admission, faculty } =
    req.body;
  pool.query(
    `UPDATE ${dbname} SET firstname = $1, lastname = $2, patronimic = $3, birthday = $4, admission = $5, faculty = $6 WHERE id = $7 RETURNING *`,
    [firstname, lastname, patronimic, birthday, admission, faculty, id],
    (error, result) => {
      if (!result.rows.length) {
        res.status(404).json({ message: 'User not found!' });
      }
      res.status(200).json({ message: 'User updated!', user: result.rows[0] });
    }
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
  createUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser
};
