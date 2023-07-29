import { callApi } from '@/utils/apiUtils';
import { clearingHouse } from '@/utils/endpoints/clearingHouse';

export const createClearingHouse = ({ body }) =>
  callApi({ uriEndPoint: clearingHouse.createClearingHouse.v1, body });
export const createDriverClearingHouse = ({ body }) =>
  callApi({ uriEndPoint: clearingHouse.createDriverClearingHouse.v1, body });

export const getAllCompanyClearingHouse = ({ body, query }) =>
  callApi({ uriEndPoint: clearingHouse.getAllCompanyClearingHouse.v1, body, query });
export const getAllDriverClearingHouse = ({ body, query }) =>
  callApi({ uriEndPoint: clearingHouse.getAllDriverClearingHouse.v1, body, query });

export const updateCompanyClearingHouse = ({ body, pathParams }) =>
  callApi({ uriEndPoint: clearingHouse.updateCompanyClearingHouse.v1, body, pathParams });
export const getSingleCompanyClearingHouse = ({ query, pathParams }) =>
  callApi({ uriEndPoint: clearingHouse.getSingleCompanyClearingHouse.v1, query, pathParams }).then(
    (res) => {
      return res;
    },
  );
export const deleteCompanyClearingHouse = ({ pathParams }) =>
  callApi({ uriEndPoint: clearingHouse.deleteCompanyClearingHouse.v1, pathParams }).then((res) => {
    return res;
  });
export const updateDriverClearingHouse = ({ body, pathParams }) =>
  callApi({ uriEndPoint: clearingHouse.updateDriverClearingHouse.v1, body, pathParams });
export const getSingleDriverClearingHouse = ({ query, pathParams }) =>
  callApi({ uriEndPoint: clearingHouse.getSingleDriverClearingHouse.v1, query, pathParams }).then(
    (res) => {
      return res;
    },
  );
export const deleteDriverClearingHouse = ({ pathParams }) =>
  callApi({ uriEndPoint: clearingHouse.deleteDriverClearingHouse.v1, pathParams }).then((res) => {
    return res;
  });
