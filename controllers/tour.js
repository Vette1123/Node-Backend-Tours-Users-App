const TOUR = require('../models/Tour');

module.exports = {
  getAllTours: (req, res) => {
    //   res.send('all users');
    // console.log('listing all users');
    // res.json(TOURS);

    // or async and await
    //try{
    //const tours = await TOUR.find();
    //res.json({
    //status:'sucess",
    //data:tours,
    //})
    //res.json(tours);
    //catch(error){}
    //}
    TOUR.find()
      .then((data) => {
        let query = JSON.stringify(req.query);
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  },
  getTourByID: async (req, res) => {
    const { id } = req.params;
    try {
      const tour = await TOUR.findById(id);
      if (tour === null)
        return res
          .status(404)
          .json({ status: 'failure', message: 'tour not found' });
      res.json({
        status: 'success',
        data: tour,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createTour: async (req, res) => {
    try {
      const tour = await TOUR.create(req.body);
      res.json({
        status: 'sucess',
        data: tour,
      });
    } catch (error) {
      res.status(500).json({ status: 'failure', message: error.message });
    }
  },
  updateTour: async (req, res) => {
    const { id } = req.params;
    try {
      //fe option f find by id and update asmo new: true 3shan y3dl f l 7aga bt3ty
      const tour = await TOUR.findByIdAndUpdate(id, req.body, { new: true });
      if (tour === null)
        return res
          .status(404)
          .json({ status: 'failure', message: 'tour not found' });
      res.json({
        status: 'success',
        data: tour,
      });
    } catch (error) {
      res.status(500).json({ status: 'failure', message: error.message });
    }
    console.log('user updated');
  },
  deleteTour: async (req, res) => {
    try {
      const { id } = req.params;
      await TOUR.findByIdAndDelete(id);
      res.status(204).json({ message: 'Success' });
    } catch (error) {
      res.status(404).json({ status: 'failure', message: 'tour not found' });
    }
    console.log('user deleted');
  },
};
