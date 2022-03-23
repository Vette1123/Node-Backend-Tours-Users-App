const { Schema, model } = require('mongoose');

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Tour name must be required'],
    unique: true,
  },
  duration: Number,
  price: Number,
  maxGroupSize: {
    type: Number,
    default: 25,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'difficult'],
  },
  ratingsAverage: Number,
  ratingsQuantity: Number,
  summary: String,
  images: [String],
  startDates: [Date],
});

const Tour = model('Tour', tourSchema);
module.exports = Tour;
