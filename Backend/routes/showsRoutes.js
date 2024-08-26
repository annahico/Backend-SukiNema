const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { configDb } = require('../config.js');
const knexConfig = configDb.knexPGConfig;
const knex = require('knex')(knexConfig);
const { tokenChecking } = require('../middlewares/checkingPermissions.js');

router.use(tokenChecking);

// Get shows by movie ID
router.get('/getshows/:movieid', async (req, res) => {
  try {
    const result = await knex.withSchema('cinemabackend')
      .table('cinemas_movies')
      .where('isactive', true)
      .andWhere('movieid', req.params.movieid);
    res.json({ shows: result });
  } catch (error) {
    console.error('Error fetching shows by movie ID:', error);
    res.status(400).json({ error: 'Failed to fetch shows' });
  }
});

// Get all shows
router.get('/getshows', async (req, res) => {
  try {
    const result = await knex.withSchema('cinemabackend')
      .table('cinemas_movies')
      .where('isactive', true);
    res.json({ shows: result });
  } catch (error) {
    console.error('Error fetching all shows:', error);
    res.status(400).json({ error: 'Failed to fetch shows' });
  }
});

// Get a specific show by show ID
router.get('/getshow/:id', async (req, res) => {
  try {
    let result = await knex.withSchema('cinemabackend')
      .table('cinemas_movies')
      .where('isactive', true)
      .andWhere('id', req.params.id);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Show not found' });
    }

    result = result[0];
    result.screeningtime = result.screeningtime.split(',');

    const movie = await knex.withSchema('cinemabackend').table('moviesdetails').where('id', result.movieid).first();
    const cinema = await knex.withSchema('cinemabackend').table('cinemasdetails').where('id', result.cinemaid).first();

    result.moviename = movie ? movie.name : null;
    result.cinemaname = cinema ? cinema.name : null;

    res.json({ show: result });
  } catch (error) {
    console.error('Error fetching show by ID:', error);
    res.status(400).json({ error: 'Failed to fetch show' });
  }
});

// Get shows by cinema ID
router.get('/getshowsbycinemaid/:cinemaid', async (req, res) => {
  try {
    const result = await knex.withSchema('cinemabackend')
      .table('cinemas_movies')
      .where('cinemaid', req.params.cinemaid)
      .andWhere('isactive', true);
    res.json({ shows: result });
  } catch (error) {
    console.error('Error fetching shows by cinema ID:', error);
    res.status(400).json({ error: 'Failed to fetch shows' });
  }
});

// Add a new show
router.post('/addshow', [
  body('screeningtime').notEmpty(),
  body('startscreeningdate').notEmpty(),
  body('endscreeningdate').notEmpty(),
  body('moviename').notEmpty(),
  body('cinemaname').notEmpty(),
  body('screen').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Please enter proper details' });
    }

    const moviesArr = await knex.withSchema('cinemabackend').table('moviesdetails').where('name', req.body.moviename);
    const cinemasArr = await knex.withSchema('cinemabackend').table('cinemasdetails').where('name', req.body.cinemaname);

    if (moviesArr.length === 0 || cinemasArr.length === 0) {
      return res.status(400).json({ error: 'Movie or Cinema not found' });
    }

    const showData = {
      movieid: moviesArr[0].id,
      cinemaid: cinemasArr[0].id,
      screen: req.body.screen,
      startscreeningdate: req.body.startscreeningdate,
      endscreeningdate: req.body.endscreeningdate,
      screeningtime: req.body.screeningtime.toString()
    };

    await knex.withSchema('cinemabackend').table('cinemas_movies').insert(showData);
    res.json({ message: 'Show added successfully' });
  } catch (error) {
    console.error('Error adding new show:', error);
    res.status(400).json({ error: 'Failed to add show' });
  }
});

// Update a show
router.put('/editshow/:id', [
  body('screeningtime').notEmpty(),
  body('startscreeningdate').notEmpty(),
  body('endscreeningdate').notEmpty(),
  body('moviename').notEmpty(),
  body('cinemaname').notEmpty(),
  body('screen').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Please enter proper details' });
    }

    const moviesArr = await knex.withSchema('cinemabackend').table('moviesdetails').where('name', req.body.moviename);
    const cinemasArr = await knex.withSchema('cinemabackend').table('cinemasdetails').where('name', req.body.cinemaname);

    if (moviesArr.length === 0 || cinemasArr.length === 0) {
      return res.status(400).json({ error: 'Movie or Cinema not found' });
    }

    const updateData = {
      movieid: moviesArr[0].id,
      cinemaid: cinemasArr[0].id,
      screen: req.body.screen,
      startscreeningdate: req.body.startscreeningdate,
      endscreeningdate: req.body.endscreeningdate,
      screeningtime: req.body.screeningtime.toString()
    };

    const result = await knex.withSchema('cinemabackend').table('cinemas_movies').where('id', req.params.id).update(updateData);

    if (result) {
      res.json({ message: 'Show updated successfully' });
    } else {
      res.status(404).json({ error: 'Show not found' });
    }
  } catch (error) {
    console.error('Error updating show:', error);
    res.status(400).json({ error: 'Failed to update show' });
  }
});

// Delete a show (soft delete)
router.delete('/deleteshow/:id', async (req, res) => {
  try {
    const result = await knex.withSchema('cinemabackend')
      .table('cinemas_movies')
      .where('id', req.params.id)
      .update({ isactive: false });

    if (result) {
      res.json({ message: 'Show deleted successfully' });
    } else {
      res.status(404).json({ error: 'Show not found' });
    }
  } catch (error) {
    console.error('Error deleting show:', error);
    res.status(400).json({ error: 'Failed to delete show' });
  }
});

module.exports = router;
