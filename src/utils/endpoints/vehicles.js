const { defaults } = require('./defaults');

export const vehicles = {
  getAllVehicles: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/vehicles/getAllVehicles',
    },
  },
  createVehicle: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/chauffeurs/getAllChauffeurs',
    },
  },
  addVehicles: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/vehicles/addVehicle',
    },
  },
  addVehicles2: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/vehicle2/addStep2',
    },
  },
  getSingleVehicleDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/vehicles/getSingleVehicleDetails',
    },
  },
  deleteVehicle: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/adminPanel/vehicles/:id',
    },
  },
  updateVehicle: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/vehicles/updateVehicle/:id',
    },
  },
};
