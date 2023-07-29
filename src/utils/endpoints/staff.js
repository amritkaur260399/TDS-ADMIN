const { defaults } = require('./defaults');

export const staff = {
  inviteStaff: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/staff/invite',
    },
  },
  getAllStaff: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/staff',
    },
  },
  acceptInvite: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/staff/accept/invitation',
    },
  },
  changeStatus: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/staff/:id/status',
    },
  },
  updateStaffProfile: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/staff/:id',
    },
  },
};
