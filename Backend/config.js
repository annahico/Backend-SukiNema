const nodemailer = require('nodemailer');

const configDb = {
  knexPGConfig: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 9874,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password@123',
      database: process.env.DB_NAME || 'demo',
    },
    pool: { min: 2, max: 10 }, // Connection pool settings
    acquireConnectionTimeout: 10000, // Timeout settings
  },
};

// Email notification configuration using Nodemailer
const configMailTransporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 321,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER || 'youremail@email.com',
    pass: process.env.EMAIL_PASS || 'password@123',
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates if necessary
  },
});

module.exports = { configDb, configMailTransporter };
