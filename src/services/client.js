import { callApi } from '@/utils/apiUtils';
import { client } from '@/utils/endpoints/client';

export const createClient = ({ body }) => callApi({ uriEndPoint: client.createClient.v1, body });

export const getAllClients = ({ body, query }) =>
  callApi({ uriEndPoint: client.getAllClients.v1, body, query });

export const updateClient = ({ body, pathParams }) =>
  callApi({ uriEndPoint: client.updateClient.v1, body, pathParams });

export const captureSignature = ({ body, pathParams }) =>
  callApi({ uriEndPoint: client.captureSignature.v1, body, pathParams });

export const getSingleClientDetails = ({ query, pathParams }) =>
  callApi({ uriEndPoint: client.getSingleClientDetails.v1, query, pathParams }).then((res) => {
    return res;
  });
export const deleteClientDetails = ({ pathParams }) =>
  callApi({ uriEndPoint: client.deleteClientDetails.v1, pathParams }).then((res) => {
    return res;
  });
export const addNotes = ({ body }) => callApi({ uriEndPoint: client.addNotes.v1, body });

export const deleteNotes = ({ pathParams }) =>
  callApi({ uriEndPoint: client.deleteNotes.v1, pathParams }).then((res) => {
    return res;
  });
