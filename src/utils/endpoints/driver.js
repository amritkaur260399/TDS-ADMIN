const { defaults } = require('./defaults');

export const driver = {
  createDriver: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/drivers/driver',
    },
  },
  getAllDrivers: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/drivers/drivers',
    },
  },
  getSingleDriverDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/drivers/driver/:id',
    },
  },
  updateDriver: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/drivers/driver/:id',
    },
  },
  updateDriverStatus: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/drivers/driver/:id/status',
    },
  },
  deleteDriverDetails: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/adminPanel/drivers/driver/:id',
    },
  },
  createImage: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/upload/image',
    },
  },
};
