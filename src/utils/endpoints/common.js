const { defaults } = require('./defaults');

export const common = {
  uploadContent: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/content',
      headerProps: {
        'Content-Type': 'multipart/form-data',
      },
    },
  },
  checkExistingLoginId: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/isExistingLoginId',
    },
  },
  checkServer: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/ping',
    },
  },
  getDashboardStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/party/dashboard/stats',
    },
  },
  getCountryCode: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/countryCode',
    },
  },
  fetchLocation: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/passenger/geo/location',
    },
  },
};
