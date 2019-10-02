const getLocation = require('../services/maps-api');

module.exports = () => (req, res, next) => {
  const { address } = req.body;

  getLocation(address) 
    .then(location => {
      if(!location) {
        return next({
          statusCode: 400,
          error: 'must have a location'
        });
      }

      req.body.location = location;
      next();
    })
    .catch(next);
};