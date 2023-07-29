const { defaults } = require('./defaults');

export const additionalPrices = {
  getadditionalPrices: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/prices/getAdditionalPrices',
    },
  },
  addAdditionalPrices: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/prices/addAdditionalPrices',
    },
  },
  updateAdditionalPrices: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/prices/updateAdditionalPrices',
    },
  },
  deleteAdditionalPrices: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/adminPanel/prices/deleteAdditionalPrice',
    },
  },
};
