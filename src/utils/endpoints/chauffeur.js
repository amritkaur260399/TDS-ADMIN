const { defaults } = require('./defaults');

export const chauffeur = {
  getAllChauffeur: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/chauffeurs/getAllChauffeurs',
    },
  },
  getSingleChauffeur: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/chauffeurs/:id',
    },
  },
  verifyChauffeur: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/chauffeurs/verifyChauffeur',
    },
  },
  assignVehicle: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/chauffeurs/assignVehicle',
    },
  },
  updateDocuments: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/adminPanel/chauffeurs/updateDocuments',
    },
  },
};
