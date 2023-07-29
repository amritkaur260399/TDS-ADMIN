import { callApi } from '@/utils/apiUtils';
import { payments } from '@/utils/endpoints/payment';

export const createPromoCode = ({ body }) =>
  callApi({ uriEndPoint: payments.createPromoCode.v1, body });

export const createPaymentLink = ({ body }) =>
  callApi({ uriEndPoint: payments.createPaymentLink.v1, body });
export const getAllPromoCodes = () => callApi({ uriEndPoint: payments.getAllPromoCodes.v1 });

export const deletePromoCode = ({ query }) =>
  callApi({ uriEndPoint: payments.deletePromoCode.v1, query }).then((res) => {
    return res;
  });
