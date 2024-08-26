const express = require('express');
const router = express.Router();
const { configDb } = require('../config.js');
const knexConfig = configDb.knexPGConfig;
const knex = require('knex')(knexConfig);
const { body, validationResult } = require('express-validator');
const { tokenChecking } = require('../middlewares/checkingPermissions.js');

router.use(tokenChecking);

// Route to get all cinemas
router.get('/getcinemas', async (req, res) => {
  try {
    console.log('Listing all the cinema details');
    const result = await knex.withSchema('cinemabackend').table('cinemasdetails').where('isactive', true);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to get cinemas' });
  }
});

// Route to get a particular cinema by ID
router.get('/getcinema/:id', async (req, res) => {
  try {
    console.log('Listing details of a particular cinema');
    const result = await knex.withSchema('cinemabackend').table('cinemasdetails').where('id', req.params.id);
    res.json({ result: result[0] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to get cinema' });
  }
});

// Route to get cinema ID by cinema name
router.get('/getcinemaidbyname/:cinemaname', async (req, res) => {
  try {
    console.log('Getting cinema ID by cinema name');
    const result = await knex.withSchema('cinemabackend').table('cinemasdetails').where('name', req.params.cinemaname);
    res.json({ result: result[0].id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to get cinema ID' });
  }
});

// Route to get cinema by cinema name
router.get('/getcinemabyname/:cinemaname', async (req, res) => {
  try {
    console.log('Getting cinema details by cinema name');
    const result = await knex.withSchema('cinemabackend').table('cinemasdetails').where('name', req.params.cinemaname);
    res.json({ result: result[0] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to get cinema details' });
  }
});

// Route to add a new cinema
router.post('/addcinema', async (req, res) => {
  try {
    console.log('Adding a new cinema');
    const errors = validationResult(req);
    if (!errors.isEmpty() || !req.body.name || !req.body.address || !req.body.contactnumber || !req.body.screens || !req.body.showsavailabilitytime) {
      return res.status(400).json({ error: 'Please enter correct and proper details' });
    }

    await knex.withSchema('cinemabackend').table('cinemasdetails').insert(req.body);
    res.json({ message: 'Cinema added successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to add cinema' });
  }
});

// Route to update a particular cinema
router.put('/editcinema/:id', async (req, res) => {
  try {
    console.log('Updating cinema details');
    const errors = validationResult(req);
    if (!errors.isEmpty() || !req.body.name || !req.body.address || !req.body.contactnumber || !req.body.screens || !req.body.showsavailabilitytime) {
      return res.status(400).json({ error: 'Please enter correct and proper details' });
    }

    const result = await knex.withSchema('cinemabackend').table('cinemasdetails').where('id', req.params.id).update({
      name: req.body.name,
      address: req.body.address,
      contactnumber: req.body.contactnumber,
      website: req.body.website,
      screens: req.body.screens,
      showsavailabilitytime: req.body.showsavailabilitytime
    });

    if (result) {
      res.json({ message: 'Success: Cinema details updated successfully' });
    } else {
      res.json({ message: 'Error: Record not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to update cinema details' });
  }
});

// Route to delete a particular cinema (soft delete)
router.delete('/delete/:id', async (req, res) => {
  try {
    console.log('Deleting a particular cinema');
    const result = await knex.withSchema('cinemabackend').table('cinemasdetails').where('id', req.params.id).update({ isactive: false });

    if (result) {
      res.json({ message: 'Deleted successfully' });
    } else {
      res.json({ error: 'Cinema not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to delete cinema' });
  }
});

module.exports = router;
