import { callApi } from '@/utils/apiUtils';
import { service } from '@/utils/endpoints/service';

export const getAllServices = () => callApi({ uriEndPoint: service.getAllServices.v1 });

export const getSingleService = ({ pathParams }) =>
  callApi({ uriEndPoint: service.getSingleService.v1, pathParams }).then((res) => {
    return res;
  });

export const updateService = ({ body, pathParams }) =>
  callApi({ uriEndPoint: service.updateService.v1, body, pathParams });
