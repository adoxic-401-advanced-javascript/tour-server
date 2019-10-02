const getLocation = require('../services/maps-api');
const getForecast = require('../services/weather-api');

module.exports = () => (req, res, next) => {
  const { address } = req.body;

  getLocation(address) 
    .then(location => {
      const lat = location.latitude;
      const long = location.longitude;
      getForecast(lat, long)
        .then(weather => {
          if(!weather) {
            return next({
              statusCode: 400,
              error: 'must have weather'
            });
          }
    
          req.body.weather = weather;
          next();
        })
        .catch(next);
    });
};