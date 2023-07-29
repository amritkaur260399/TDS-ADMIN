const { defaults } = require('./defaults');

export const dasboard = {
  getStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel',
    },
  },
  getCounts:{
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/getAll/dashboardCount',
    },
  }
};
