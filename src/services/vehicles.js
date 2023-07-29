import { callApi } from '@/utils/apiUtils';
import { vehicles } from '@/utils/endpoints/vehicles';

export const getAllVehicles = ({ query }) =>
  callApi({ uriEndPoint: vehicles.getAllVehicles.v1, query });

export const createVehicle = ({ body }) =>
  callApi({ uriEndPoint: vehicles.createVehicle.v1, body });
export const addVehicles = ({ body }) =>
  callApi({ uriEndPoint: vehicles.addVehicles.v1, body }).then((res) => {
    return res;
  });
export const addVehicles2 = ({ body }) =>
  callApi({ uriEndPoint: vehicles.addVehicles2.v1, body }).then((res) => {
    return res;
  });
export const getSingleVehicleDetails = ({ body, query }) =>
  callApi({ uriEndPoint: vehicles.getSingleVehicleDetails.v1, body, query });
export const deleteVehicle = ({ pathParams }) =>
  callApi({ uriEndPoint: vehicles.deleteVehicle.v1, pathParams }).then((res) => {
    return res;
  });
export const updateVehicle = ({ body, pathParams }) =>
  callApi({ uriEndPoint: vehicles.updateVehicle.v1, body, pathParams }).then((res) => {
    return res;
  });
