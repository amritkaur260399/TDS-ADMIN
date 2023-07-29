const { defaults } = require('./defaults');

export const clearingHouse = {
  createClearingHouse: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/companyClearings/clearing',
    },
  },
  createDriverClearingHouse: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/driverClearings',
    },
  },
  getAllCompanyClearingHouse: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/companyClearings',
    },
  },
  getAllDriverClearingHouse: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/driverClearings',
    },
  },
  getSingleCompanyClearingHouse: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/companyClearings/:id',
    },
  },
  getSingleDriverClearingHouse: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/driverClearings/:id',
    },
  },
  updateCompanyClearingHouse: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/companyClearings/:id',
    },
  },
  updateDriverClearingHouse: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/driverClearings/:id',
    },
  },
  deleteCompanyClearingHouse: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/adminPanel/companyClearings/:id',
    },
  },
  deleteDriverClearingHouse: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/adminPanel/driverClearings/:id',
    },
  },
};
