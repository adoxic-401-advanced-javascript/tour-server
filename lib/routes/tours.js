// eslint-disable-next-line new-cap
const router = require('express').Router();
const Tour = require('../models/tour');
const getGeo = require('../middleware/get-location');
const getWeather = require('../middleware/get-weather');

router
  .post('/', (req, res, next) => {
    Tour.create(req.body)
      .then(tour => res.json(tour))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Tour.find()
      .lean()
      .then(tour => res.json(tour))
      .catch(next);
  })

  .post('/:id/stops', getGeo(), getWeather(), (req, res, next) => {
    Tour.addStop(req.params.id, req.body.location, req.body.weather)
      .then(tour => res.json(tour))
      .catch(next);
  })

  .delete('/:id/stops/:stopId', (req, res, next) => {
    Tour.removeStop(req.params.id, req.params.stopId)
      .then(stops => res.json(stops))
      .catch(next);
  })

  .put('/:id/stops/:stopId/attendance', ({ params, body }, res, next) => {
    Tour.updateStopAtt(params.id, params.stopId, body.attendance)
      .then(stops => res.json(stops))
      .catch(next);
  });

module.exports = router;