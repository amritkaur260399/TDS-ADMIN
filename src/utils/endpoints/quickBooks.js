const { defaults } = require('./defaults');

export const quickBooks = {
  getQuickBooksurl: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/quickBooks/login',
    },
  },
  createLogin: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/quickBooks/generate/token',
    },
  },
  createCustomer: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/quickBooks/createCustomer',
    },
  },
  refreshToken: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/quickBooks/generate/token/use/refresh',
    },
  },
  getExistingToken: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/quickBooks/get/token/:id',
    },
  },
  createInvoice: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/quickBooks/createInvoice',
    },
  },
  updateInvoice: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/quickBooks/updateInvoice',
    },
  },

  queryCustomer: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/quickBooks/queryCustomer',
    },
  },
};
