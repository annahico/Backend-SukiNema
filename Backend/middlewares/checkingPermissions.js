const { configDb } = require('../config.js');
const knexConfig = configDb.knexPGConfig;
const knex = require('knex')(knexConfig);

let record = null;

// Token checking middleware
const tokenChecking = async (req, res, next) => {
  try {
    console.log('Token checking middleware');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'No token received' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    record = await knex.withSchema('cinemabackend').table('usersdetails').where('jwt', token).first();
    if (!record) {
      return res.status(401).json({ error: 'Please login first and then try again' });
    }

    next();
  } catch (error) {
    console.error('Error during token checking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Admin checking middleware
const adminChecking = async (req, res, next) => {
  try {
    if (record && record.role === true) {
      next();
    } else {
      console.log('User does not have permission to access admin portals');
      res.status(403).json({ error: 'You do not have permission to access admin portals' });
    }
  } catch (error) {
    console.error('Error during admin check:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Admin and self-user access middleware
const adminAndSelfUserAccess = async (req, res, next) => {
  try {
    if (record && (record.role === true || record.id == req.params.userid)) {
      next();
    } else {
      console.log('User does not have permission to access this portal');
      res.status(403).json({ error: 'You do not have permission to access this portal' });
    }
  } catch (error) {
    console.error('Error during admin/self-user access check:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { tokenChecking, adminChecking, adminAndSelfUserAccess };
