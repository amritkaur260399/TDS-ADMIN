const { defaults } = require('./defaults');

export const client = {
  createClient: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/clients/client',
    },
  },
  getAllClients: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/clients/clients',
    },
  },

  getSingleClientDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/clients/client/:id',
    },
  },
  updateClient: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/clients/client/:id',
    },
  },
  updateClient: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/clients/client/:id',
    },
  },
  captureSignature: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/clients/capture/signature/:id',
    },
  },
  deleteClientDetails: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/adminPanel/clients/client/:id',
    },
  },
  addNotes: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/clients/create/note',
    },
  },
  deleteNotes: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/adminPanel/clients/delete/note/:id',
    },
  },
};
