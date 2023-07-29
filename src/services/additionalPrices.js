import { callApi } from '@/utils/apiUtils';
import { additionalPrices } from '@/utils/endpoints/additionalPrices';

export const getAdditionalPrices = () =>
  callApi({ uriEndPoint: additionalPrices.getadditionalPrices.v1 });
export const addAdditionalPrices = ({ body }) =>
  callApi({ uriEndPoint: additionalPrices.addAdditionalPrices.v1, body }).then((res) => {
    return res;
  });

export const updateAdditionalPrices = ({ body, query }) =>
  callApi({ uriEndPoint: additionalPrices.updateAdditionalPrices.v1, body, query });
export const deleteAdditionalPrices = ({ query }) =>
  callApi({ uriEndPoint: additionalPrices.deleteAdditionalPrices.v1, query });
