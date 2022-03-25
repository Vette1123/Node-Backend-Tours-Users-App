const mongoose = require('mongoose');
const server = require('./app.js');
const dotenv = require('dotenv');
//BY DEFAULT BY2RA .ENV
dotenv.config('.env');
const { PORT, HOST, DB_URL } = process.env;
mongoose
  .connect(DB_URL)
  .then((con) => {
    console.log('db connected');
  })
  .catch((err) => {
    console.log('error', err);
  });

//3shan a3f agbhom mn env

// const tourSchema = new mongoose.Schema({
//   name: String,
//   duration: Number,
//   price: Number,
// });

// const Tour = mongoose.model('tour', tourSchema);

// const firstTour = new Tour({
//   name: 'first tour222',
//   duration: 10,
//   price: 500,
// });

// firstTour
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log(err));

server.listen(PORT, HOST, () => {
  console.log('server is running');
});
