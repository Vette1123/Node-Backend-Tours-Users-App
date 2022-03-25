const express = require('express');
const router = express.Router();
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
