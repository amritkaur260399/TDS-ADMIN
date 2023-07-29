import { callApi } from '@/utils/apiUtils';
import { quickBooks } from '@/utils/endpoints/quickBooks';

export const getQuickBooksurl = () => callApi({ uriEndPoint: quickBooks.getQuickBooksurl.v1 });

export const createLogin = ({ body }) => callApi({ uriEndPoint: quickBooks.createLogin.v1, body });

export const createCustomer = ({ body }) =>
  callApi({ uriEndPoint: quickBooks.createCustomer.v1, body });

export const refreshTokenCall = ({ body }) =>
  callApi({ uriEndPoint: quickBooks.refreshToken.v1, body });

export const getExistingToken = ({ pathParams }) =>
  callApi({ uriEndPoint: quickBooks.getExistingToken.v1, pathParams });

export const createInvoice = ({ body }) =>
  callApi({ uriEndPoint: quickBooks.createInvoice.v1, body });

export const updateInvoice = ({ body }) =>
  callApi({ uriEndPoint: quickBooks.updateInvoice.v1, body });

export const queryCustomer = ({ body }) =>
  callApi({ uriEndPoint: quickBooks.queryCustomer.v1, body });
