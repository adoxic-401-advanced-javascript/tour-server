jest.mock('../../lib/services/maps-api');
jest.mock('../../lib/services/weather-api');
const request = require('../request');
const db = require('../db');
const getLocation = require('../../lib/services/maps-api');
const getWeather = require('../../lib/services/weather-api');

getLocation.mockResolvedValue({
  latitude: 45.5266975,
  longitude: -122.6880503
});
getWeather.mockResolvedValue({
  time: new Date(1569999600 * 1000).toISOString(),
  summary: 'Mostly cloudy throughout the day.',
});

describe('tour api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  const location1 = {
    name: 'Test Location 1',
    address: '97209'
  };

  const data = {
    title: 'You are Valid',
    activities: ['crying', 'eating ice cream'],
    launchDate: new Date(),
    stops: [{}]
  };

  function postTour(data) {
    return request
      .post('/api/tours')
      .send(data)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a tour', () => {
    return postTour(data).then(tour => {
      expect(tour).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          launchDate: expect.any(String)
        },

        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "activities": Array [
            "crying",
            "eating ice cream",
          ],
          "launchDate": Any<String>,
          "stops": Array [
            Object {},
          ],
          "title": "You are Valid",
        }
      `
      );
    });
  });

  it('gets tours', () => {
    return postTour(data).then(() => {
      return request.get('/api/tours').then(({ body }) => {
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            launchDate: expect.any(String)
          },

          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "activities": Array [
              "crying",
              "eating ice cream",
            ],
            "launchDate": Any<String>,
            "stops": Array [
              Object {},
            ],
            "title": "You are Valid",
          }
        `
        );
      });
    });
  });

  it('adds a stop', () => {
    return postTour(data).then(tour => {
      console.log(tour);
      return request
        .post(`/api/tours/${tour._id}/stops`)
        .send(location1)
        .expect(200)
        .then(({ body }) => [body, location1, location1]);
    });
  });
});
