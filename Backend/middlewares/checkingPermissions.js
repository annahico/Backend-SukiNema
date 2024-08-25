// Conexión a la base de datos PostgreSQL
const { configDb } = require('../config.js');
const knexConfig = configDb.knexPGConfig;
const knex = require('knex')(knexConfig);

let record = null;

// Middleware de verificación de token
const tokenChecking = async (req, res, next) => {
  try {
    console.log('token checking middleware');
    console.log(req.headers, req.body);

    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'No token received' });
    }

    const token = req.headers.authorization.split(' ')[1];

    record = await knex.withSchema('cinemabackend').table('usersdetails').where('jwt', token);

    if (!record.length) {
      return res.status(401).json({ error: 'Please login first and then try again' });
    }

    record = record[0];
    next();
  } catch (error) {
    console.log('catch', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Middleware de verificación de admin
const adminChecking = async (req, res, next) => {
  try {
    if (record && record.role === true) {
      next();
    } else {
      console.log('Users have no permissions to access admin portals');
      res.status(403).json({ error: 'Users have no permissions to access admin portals' });
    }
  } catch (error) {
    console.log('catch', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Middleware de acceso de admin y usuario propio
const adminAndSelfUserAccess = async (req, res, next) => {
  try {
    if (record && (record.role === true || record.id === req.params.userid)) {
      next();
    } else {
      res.status(403).json({ error: 'Users have no permissions to access other users portals' });
    }
  } catch (error) {
    console.log('catch', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { tokenChecking, adminChecking, adminAndSelfUserAccess };
