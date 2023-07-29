import { callApi } from '@/utils/apiUtils';
import { prices } from '@/utils/endpoints/prices';

export const getPrices = ({ query }) => callApi({ uriEndPoint: prices.getPrices.v1, query });
export const addVehiclePrices = ({ body }) =>
  callApi({ uriEndPoint: prices.addVehiclePrices.v1, body });
export const updateVehiclePrices = ({ body, query }) =>
  callApi({ uriEndPoint: prices.updateVehiclePrices.v1, body, query });
export const deleteVehiclePrices = ({ query }) =>
  callApi({ uriEndPoint: prices.deleteVehiclePrices.v1, query });
