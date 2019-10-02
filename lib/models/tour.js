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
    type: Object
  }] 
});

schema.statics = {
  addStop(id, location, weather) {
    return this.updateById(
      id,
      {
        $push: {
          stop: { location: location, weather: weather }
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