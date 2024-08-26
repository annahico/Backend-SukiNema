const express = require('express');
const router = express.Router();
const { configDb } = require('../config.js');
const knexConfig = configDb.knexPGConfig;
const knex = require('knex')(knexConfig);
const { body, validationResult } = require('express-validator');
const { tokenChecking } = require('../middlewares/checkingPermissions.js');

router.use(tokenChecking);

// Route to get all active movies
router.get('/getmovies', async (req, res) => {
  try {
    const result = await knex.withSchema('cinemabackend').table('moviesdetails').where('isactive', true);
    console.log(result);
    res.json({ moviesList: result });
  } catch (error) {
    console.log('Error:', error);
    res.status(400).json({ error: 'Failed to get movies' });
  }
});

// Route to get a particular movie by ID
router.get('/getmovie/:id', async (req, res) => {
  try {
    console.log('Listing details of a particular movie');
    const result = await knex.withSchema('cinemabackend').table('moviesdetails').where('id', req.params.id);
    console.log(result[0]);
    res.json({ result: result[0] });
  } catch (error) {
    console.log('Error:', error);
    res.status(400).json({ error: 'Failed to get movie' });
  }
});

// Route to get movie ID by movie name
router.get('/getmovieidbyname/:moviename', async (req, res) => {
  try {
    console.log('Getting movie ID by movie name');
    const result = await knex.withSchema('cinemabackend').table('moviesdetails').where('name', req.params.moviename);
    console.log(result[0]);
    res.json({ result: result[0].id });
  } catch (error) {
    console.log('Error:', error);
    res.status(400).json({ error: 'Failed to get movie ID' });
  }
});

// Route to add a new movie
router.post('/addmovie', body('releaseddate').isDate(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty() || !req.body.name || !req.body.descrp) {
      return res.status(400).json({ error: 'Fields are not proper' });
    }

    await knex.withSchema('cinemabackend').table('moviesdetails').insert(req.body);
    res.json({ message: 'Movie inserted successfully' });
  } catch (error) {
    console.log('Error:', error);
    res.status(400).json({ error: 'Failed to add movie' });
  }
});

// Route to update an existing movie
router.put('/editmovie/:id', body('releaseddate').isDate(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty() || !req.body.name || !req.body.descrp) {
      return res.status(400).json({ error: 'Fields are not proper' });
    }

    const result = await knex.withSchema('cinemabackend').table('moviesdetails').where('id', req.params.id).update({
      name: req.body.name,
      descrp: req.body.descrp,
      releaseddate: req.body.releaseddate,
      movieposter: req.body.movieposter
    });

    if (result) {
      res.json({ message: 'Movie updated successfully' });
    } else {
      res.json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(400).json({ error: 'Failed to update movie' });
  }
});

// Route to delete an existing movie (soft delete)
router.delete('/deletemovie/:id', async (req, res) => {
  try {
    console.log('Deleting a particular movie');
    const result = await knex.withSchema('cinemabackend').table('moviesdetails').where('id', req.params.id).andWhere('isactive', true).update({ isactive: false });

    if (result) {
      res.json({ message: 'Movie deleted successfully' });
    } else {
      res.json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(400).json({ error: 'Failed to delete movie' });
  }
});

module.exports = router;
