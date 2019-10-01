const Tour = require('../tour');

describe('is an tour', () => {
  it('valid model', () => {
    const data = {
      title: 'You are Valid',
      activities: ['crying', 'eating ice cream'],
      launchDate: new Date(),
      stops: [{
        location: 'Tetra',
        weather: {},
        attendance: 10
      }]
    };

    const tour = new Tour(data);

    const errors = tour.validateSync();
    expect(errors).toBeUndefined();

    const json = tour.toJSON();
    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
      stops: [{ _id: expect.any(Object), attendance: 10, location: 'Tetra' }]
    });
  });

  it('invalid model', () => {
    const data = {
      name: 1973,
      birthYear: 'Stephanie Meyer'
    };
    const tour = new Tour(data);

    const errors = tour.validateSync();
    expect(errors).toBeTruthy();
  });

});