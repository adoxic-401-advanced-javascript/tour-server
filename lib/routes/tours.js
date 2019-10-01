// eslint-disable-next-line new-cap
const router = require('express').Router();
const Tour = require('../models/tour');


router
  .post('/', (req, res, next) => {
    Tour.create(req.body)
      .then(tour => res.json(tour))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Tour.find(req.params)
      .select('name')
      .then(tour => res.json(tour))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Tour.findByIdAndRemove(req.params.id)
      .then(tour => res.json(tour))
      .catch(next);
  });

module.exports = router;