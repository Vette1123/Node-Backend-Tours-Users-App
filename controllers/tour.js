const TOUR = require('../models/Tour');

const { catchAsync } = require('../utils/utils');
module.exports = {
  findTourByID: async (req, res, next) => {
    const { id } = req.params;
    const tour = await TOUR.findById(id);
    if (tour === null) {
      return next({ status: 'failure', message: 'tour not found' });
    }
    req.tour = tour;
    next();
  },
  getAllTours: (req, res) => {
    TOUR.find()
      .then((data) => {
        let query = JSON.stringify(req.query);
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  },
  getTourByID: catchAsync(async (req, res) => {
    res.json({
      status: 'success',
      data: req.tour,
    });
  }),
  createTour: catchAsync(async (req, res) => {
    const tour = await TOUR.create(req.body);
    res.json({
      status: 'sucess',
      data: tour,
    });
  }),
  updateTour: catchAsync(async (req, res) => {
    const { id } = req.params;
    //fe option f find by id and update asmo new: true 3shan y3dl f l 7aga bt3ty
    const tour = await TOUR.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      status: 'Success, Tour updated',
      data: tour,
    });
  }),
  deleteTour: catchAsync(async (req, res) => {
    const { id } = req.params;
    await TOUR.findByIdAndDelete(id);
    res.status(204).json({ message: 'Success, Tour deleted' });
  }),
};
