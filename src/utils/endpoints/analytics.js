const { defaults } = require('./defaults');

export const analytics = {
  getAnalytics: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/getAnalytics',
    },
  },
};
