//1 time script to insert data into the database

const mongoose = require('mongoose');
const toursData = require('./data/tours-simple.json');
const TourModel = require('../models/Tour');
const dotenv = require('dotenv');
dotenv.config('.env');

const importData = async () => await TourModel.insertMany(toursData);
const deleteData = async () => await TourModel.deleteMany();
const main = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('DB Connceted');
    if (process.argv[2] === '--import') await importData();
    else if (process.argv[2] === '--delete') await deleteData();
  } catch (error) {
    console.log(error);
  }
};
main();
