const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { configDb } = require('../config.js');
const knexConfig = configDb.knexPGConfig;
const knex = require('knex')(knexConfig);
const jwt = require('jsonwebtoken');

// let Crypto = require('crypto');
// let secret_key = 'fd85b494-aaaa';
// let secret_iv = 'smslt';
// let encryptionMethod = 'AES-256-CBC';
// let key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substring(0, 32);
// let iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substring(0, 16);

function encryptString(plain_text, encryptionMethod, secret, iv) {
  let encryptor = Crypto.createCipheriv(encryptionMethod, secret, iv);
  let aes_encrypted = encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64');
  return Buffer.from(aes_encrypted).toString('base64');
}

function decryptString(encryptedString, encryptionMethod, secret, iv) {
  const buff = Buffer.from(encryptedString, 'base64');
  encryptedString = buff.toString('utf-8');
  let decryptor = Crypto.createDecipheriv(encryptionMethod, secret, iv);
  return decryptor.update(encryptedString, 'base64', 'utf8') + decryptor.final('utf8');
}

router.post('/registration', body('name').isLength({ min: 3 }), body('email').isEmail(), body('password').isLength({ min: 8 }), async (req, res) => {
  try {
    console.log('user is registering');
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({ error: 'error accured: credentials are not valid' });
    }
    const alreadyExists = await knex.withSchema('cinemabackend').table('usersdetails').where('email', req.body.email);
    if (alreadyExists.length) {
      res.json({ error: 'error: Email is already exists' });
    } else {
      req.body.password = encryptString(req.body.password, encryptionMethod, key, iv);
      console.log('registering password is ', req.body.password);
      await knex.withSchema('cinemabackend').table('usersdetails').insert(req.body);
      res.json({ message: 'success: registration successfull' });
    }
  } catch (error) {
    console.log('catch', error);
    res.status(400);
  }
});

router.post('/login', body('email').isEmail(), body('password').isLength({ min: 8 }), async (req, res) => {
  try {
    console.log('user is logging in');
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({ error: 'error accured' });
    }
    const record = await knex.withSchema('cinemabackend').table('usersdetails').andWhere('email', req.body.email);
    console.log(record);
    if (!record.length) {
      res.json({ error: ' no record found' });
    }
    let password = decryptString(record[0].password, encryptionMethod, key, iv);
    console.log(password);
    if (req.body.password != password) {
      res.json({ error: 'password not matched' });
    } else {
      console.log('password matches');
      const token = jwt.sign(record[0], 'secretkey');
      await knex.withSchema('cinemabackend').table('usersdetails').andWhere('email', req.body.email).update({ jwt: token });
      res.json({ login: 'success', token: token, role: record[0].role });
    }
  } catch (error) {
    console.log('catch', error);
    res.status(400);
  }
});

router.post('/sendemail', body('email').isEmail(), async (req, res) => {
  try {
    console.log('sending forgot-password to user"s email', req.body.email);
    const record = await knex.withSchema('cinemabackend').table('usersdetails').where('email', req.body.email);
    console.log(record);
    if (!record.length) {
      res.json({ error: 'no email is found' });
    } else {
      let details = {
        from: "youremail@email.com",
        to: req.body.email,
        subject: "your forgotten password from BookMyShow",
        text: `Your forgotten password is  :- ${decryptString(record[0].password, encryptionMethod, key, iv)} `
      }
      const { configMailTransporter } = require('../config.js');
      configMailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log("it has an error", err);
          res.json({ error: err });
        } else {
          console.log('email has sent');
          res.json({ message: 'email has sent: check your email' });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: `catch ${error}` });
  }
});

const { tokenChecking, adminChecking, adminAndSelfUserAccess } = require('../middlewares/checkingPermissions');
router.use(tokenChecking);

router.get('/getrole', async (req, res) => {
  try {
    let temp = req.headers.authorization.split(' ');
    const token = temp[1];
    record = await knex.withSchema('cinemabackend').table('usersdetails').where('jwt', token);
    console.log('record is', record[0]);
    console.log(record[0].role);
    if (record[0].role == true) Role = 1; else Role = 0;
    console.log('backend role', Role);
    res.json({ role: Role });
  } catch (error) {
    console.log('catch', error);
    res.status(400);
  }
});

router.get('/getusers', async (req, res) => {
  try {
    console.log('listing all the users details');
    const result = await knex.withSchema('cinemabackend').table('usersdetails').where('isactive', true);
    console.log(result);
    res.json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

router.get('/getuser/:id', adminAndSelfUserAccess, async (req, res) => {
  try {
    console.log('listing a particular user details');
    const result = await knex.withSchema('cinemabackend').table('usersdetails').where('id', req.params.id);
    res.json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

router.get('/getuserbytoken', async (req, res) => {
  try {
    let temp = req.headers.authorization.split(' ');
    const token = temp[1];
    const result = await knex.withSchema('cinemabackend').table('usersdetails').where('jwt', token);
    res.json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

router.put('/update', body('name').isLength({ min: 3 }), body('email').isEmail(), body('password').isLength({ min: 8 }), async (req, res) => {
  try {
    console.log('user is updating the details');
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(404).json('please enter correct details');
    }
    let temp = req.headers.authorization.split(' ');
    const token = temp[1];
    bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
      await knex.withSchema('cinemabackend').table('usersdetails').where('jwt', token).update({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });
      res.json('succesfully updated');
    });
  } catch (error) {
    console.log("catch", error);
    res.status(400);
  }
});

router.get('/logout', async (req, res) => {
  try {
    console.log('user is logging out');
    let temp = req.headers.authorization.split(' ');
    const token = temp[1];
    const result = await knex.withSchema('cinemabackend').table('usersdetails').where('jwt', token).update({ jwt: null });
    res.json({ message: 'you are successfully logged out' });
  } catch (error) {
    console.log('catch', error);
    res.status(400);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    console.log('deleting a particular user id:', req.params.id);
    const result = await knex.withSchema('cinemabackend').table('usersdetails').andWhere('id', req.params.id).update({ isactive: false });
    res.json({ message: 'deleted successfully' });
  } catch (error) {
    console.log('catch', error);
    res.status(400);
  }
});

module.exports = router;
