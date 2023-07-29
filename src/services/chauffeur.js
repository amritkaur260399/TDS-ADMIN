import { callApi } from '@/utils/apiUtils';
import { chauffeur } from '@/utils/endpoints/chauffeur';

export const getAllChauffeur = ({ query }) =>
  callApi({ uriEndPoint: chauffeur.getAllChauffeur.v1, query });
export const verifyChauffeur = ({ body, pathParams }) =>
  callApi({ uriEndPoint: chauffeur.verifyChauffeur.v1, body, pathParams });
export const getSingleChauffeur = ({ pathParams }) =>
  callApi({ uriEndPoint: chauffeur.getSingleChauffeur.v1, pathParams });
export const assignVehicle = ({ body }) =>
  callApi({ uriEndPoint: chauffeur.assignVehicle.v1, body });
export const updateDocuments = ({ body, query }) =>
  callApi({ uriEndPoint: chauffeur.updateDocuments.v1, query });
