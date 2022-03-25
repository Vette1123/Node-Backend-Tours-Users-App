const express = require('express');
const TOURS = require('../../dev-data/data/tours-simple.json');
const router = express.Router();
const TOUR = require('../../models/Tour');
const {
  getAllTours,
  getTourByID,
  createTour,
  updateTour,
  deleteTour,
  findTourByID,
} = require('../../controllers/tour');

//tours

router.route('/').get(getAllTours).post(createTour);
router.use('/:id', findTourByID);
router.route('/:id').get(getTourByID).patch(updateTour).delete(deleteTour);

module.exports = router;
