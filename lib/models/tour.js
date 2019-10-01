const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  activities: [{
    type: String,
    required: true
  }],
  launchDate: {
    type: Date,
    required: true
  },
  stops: [{
    location: {
      type: String,
      required: false,
    },
    weather: {
      type: Object,
      required: false,
    },
    attendance: {
      type: Number,
      required: false,
      min: 1
    },
  }] 
});

module.exports = mongoose.model('Tour', schema);