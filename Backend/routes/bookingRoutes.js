const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { configDb } = require('../config.js');
const knexConfig = configDb.knexPGConfig;
const knex = require('knex')(knexConfig);
const { tokenChecking, adminAndSelfUserAccess } = require('../middlewares/checkingPermissions.js');

router.use(tokenChecking);

// Route for a new ticket booking
router.post('/booktickets/:email',
  body('userid').isInt(),
  body('cinemaid').isInt(),
  body('movieid').isInt(),
  body('showid').isInt(),
  body('amount').isInt(),
  async (req, res) => {
    try {
      console.log('Booking tickets backend');
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json('Please enter proper details');
      }

      await knex.withSchema('cinemabackend').table('bookings').insert(req.body);
      console.log(req.body);

      const details = {
        from: "youremail@email.com",
        to: req.params.email,
        subject: "Cinema ticket booked successfully",
        text: "Ticket success"
      };

      // Sending mail notification
      const { configMailTransporter } = require('../config.js');

      configMailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log("Error sending email", err);
          return res.json(err);
        }
        console.log('Email has been sent');
        res.json({ message: 'Success: Email has been sent' });
      });

    } catch (error) {
      console.log(error);
      res.status(400);
    }
  }
);

// Route to get booking history by user ID
router.get('/getbookinghistory/:userid', adminAndSelfUserAccess, async (req, res) => {
  try {
    const result = await knex.withSchema('cinemabackend').table('bookings').where('userid', req.params.userid);
    res.json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

module.exports = router;
