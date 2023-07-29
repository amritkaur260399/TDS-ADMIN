const { defaults } = require('./defaults');

export const addUser = {
  createUser: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/users/user',
    },
  },
  getAllUsers: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/users/users',
    },
  },
  getSingleUser: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/users/user/:id',
    },
  },
  deleteUser: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/adminPanel/users/user/:id',
    },
  },
  updateUser: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/users/user/:id',
    },
  },
  verifyOtp: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/users/user/otpverify',
    },
  },
  verifyPassword: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/users/finally/addUser',
    },
  },
  confirmPassword: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/users/user/create/password',
    },
  },
};
