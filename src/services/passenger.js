import { callApi } from '@/utils/apiUtils';
import { passengers } from '@/utils/endpoints/passenger';

export const getAllFeedback = ({ query }) =>
  callApi({ uriEndPoint: passengers.getAllFeedback.v1, query });
export const addResponse = ({ body }) => callApi({ uriEndPoint: passengers.addResponse.v1, body });
