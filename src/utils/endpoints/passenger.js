const { defaults } = require('./defaults');

export const passengers = {
  getAllFeedback: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/passenger/getAllFeedback',
    },
  },
  addResponse: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/passenger/addResponse',
    },
  },
};
