const { defaults } = require('./defaults');

export const service = {
  getAllServices: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/services/getall',
    },
  },

  getSingleService: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/services/getSingle/:id',
    },
  },

  updateService: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/services/update/:id',
    },
  },

  deleteService: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/adminPanel/services/delete/:id',
    },
  },
};
