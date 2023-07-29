const { defaults } = require('./defaults');

export const prices = {
  getPrices: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/prices/getVehiclePrices',
    },
  },
  addVehiclePrices: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/prices/addVehiclePrices',
    },
  },
  updateVehiclePrices: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/prices/updateVehiclePrices',
    },
  },
  deleteVehiclePrices: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/adminPanel/prices/deleteVehiclePrice',
    },
  },
};
