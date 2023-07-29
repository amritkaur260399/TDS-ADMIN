const { defaults } = require('./defaults');

export const rides = {
  getRides: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/rides/getAllRides',
    },
  },
  createRide: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/rides/createRide',
    },
  },
  getSingleRideDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/rides/getSingleRideDetails',
    },
  },
  updateRide: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/rides/updateRide',
    },
  },
  deleteRide: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/adminPanel/rides/:id',
    },
  },
};
