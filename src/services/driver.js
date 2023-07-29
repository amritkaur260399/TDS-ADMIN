import { callApi } from '@/utils/apiUtils';
import { driver } from '@/utils/endpoints/driver';

export const createDriver = ({ body }) => callApi({ uriEndPoint: driver.createDriver.v1, body });

export const getAllDrivers = ({ body, query }) =>
  callApi({ uriEndPoint: driver.getAllDrivers.v1, body, query });

export const updateDriver = ({ body, pathParams }) =>
  callApi({ uriEndPoint: driver.updateDriver.v1, body, pathParams });
export const updateDriverStatus = ({ body, pathParams }) =>
  callApi({ uriEndPoint: driver.updateDriverStatus.v1, body, pathParams });
export const getSingleDriverDetails = ({ query, pathParams }) =>
  callApi({ uriEndPoint: driver.getSingleDriverDetails.v1, query, pathParams }).then((res) => {
    return res;
  });
export const deleteDriverDetails = ({ pathParams }) =>
  callApi({ uriEndPoint: driver.deleteDriverDetails.v1, pathParams }).then((res) => {
    return res;
  });
export const createImage = ({ body }) => callApi({ uriEndPoint: driver.createImage.v1, body });
