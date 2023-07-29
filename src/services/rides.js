import { callApi } from '@/utils/apiUtils';
import { rides } from '@/utils/endpoints/rides';

export const getRides = ({ query }) =>
  callApi({ uriEndPoint: rides.getRides.v1, query }).then((res) => {
    return res;
  });

export const createRide = ({ body }) =>
  callApi({ uriEndPoint: rides.createRide.v1, body }).then((res) => console.log('res :>> ', res));
export const getSingleRideDetails = ({ query }) =>
  callApi({ uriEndPoint: rides.getSingleRideDetails.v1, query }).then((res) => {
    return res;
  });
export const updateRide = ({ query, body }) =>
  callApi({ uriEndPoint: rides.updateRide.v1, query, body });
export const deleteRide = ({ pathParams }) =>
  callApi({ uriEndPoint: rides.deleteRide.v1, pathParams }).then((res) => {
    return res;
  });
