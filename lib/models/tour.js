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
      type: Object,
    },
    weather: {
      type: Object,
    },
    attendance: {
      type: Number,
    }
  }] 
});

schema.statics = {
  addStop(id, location, weather) {
    return this.updateById(
      id,
      {
        $push: {
          stops: [{ location: location, weather: weather, attendance: 0 }]
        }
      }
    )
      .then(tour => tour.stops);
  },

  removeStop(id, stopId) {
    return this.updateById(id, {
      $pull: {
        stops: { _id: stopId }
      }
    })
      .then(tour => tour.shows);
  },

  updateStopAtt(id, stopId, attendance) {
    console.log('main id', id, 'stop id', stopId);
    return this.updateOne(
      { _id: id, 'stops._id': stopId },
      {
        $set: {
          'stops.$.attendance': attendance
        }
      }
    )
      .then(tour => tour.stops);
  }
};

module.exports = mongoose.model('Tour', schema);