//pg database configuration
const configDb = {
  knexPGConfig: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'password@123',
      database: 'demo'
    }
  }
}

// email notification configuration using nodemailer
const nodemailer = require('nodemailer');

const configMailTransporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: "youremail@email.com",
    pass: "password@123"
  }
});

module.exports = { configDb, configMailTransporter };




