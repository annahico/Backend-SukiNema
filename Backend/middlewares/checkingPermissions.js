const { configDb } = require('../config.js');
const knexConfig = configDb.knexPGConfig;
const knex = require('knex')(knexConfig);

let record = null;

//token checking middleware
const tokenChecking = (async (req, res, next) => {
  try {
    console.log('token checking middleware');
    console.log(req.headers, req.body);

    if (!req.headers.authorization) {
      res.json({ error: 'No token recieved' });
    }
    let temp = req.headers.authorization.split(' ');
    const token = temp[1];
    record = await knex.withSchema('cinemabackend').table('usersdetails').where('jwt', token);
    if (!record.length) {
      res.json({ error: 'please login first and then try again' });
    }
    else {
      record = record[0];
      next();
    }
  }
  catch (error) {
    console.log('catch', error);
    res.status(404);
  }
});

//admin checking middleware
const adminChecking = (async (req, res, next) => {
  try {
    if (record.role == true) {
      next();
    }
    else {
      console.log('users have No permissions to access admin portals');
      res.json({ error: 'error:  users have No permissions to access admin portals' });
    }
  }
  catch (error) {
    res.json({ error: error });
    // res.status(404);
  }
});

//admin and self user middleware
const adminAndSelfUserAccess = (async (req, res, next) => {
  try {
    if (record.role == true || record.id == req.params.userid) {
      next();
    }
    else {
      res.json({ error: 'users have No permissions to access other users portals' });
    }
  }
  catch (error) {
    console.log('catch', error);
    res.status(404);
  }
});

module.exports = { tokenChecking, adminChecking, adminAndSelfUserAccess };