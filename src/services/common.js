import { hostname, callApi } from '@/utils/apiUtils';
import { common } from '@/utils/endpoints/common';
import Axios from 'axios';

export const getCountryStates = ({ pathParams: { countryId } }) =>
  Axios.get(`${hostname()}/xapi/v1/common/country/${countryId}/provinces`)
    .then((result) => result.data)
    .catch(() => {});

export const getCountriesList = () =>
  Axios({
    method: 'get',
    url: `${hostname()}/xapi/v1/common/country`,
  })
    .then((response) => {
      const status = 'ok';
      return {
        data: response.data,
        status,
      };
    })
    .catch(() => {
      const status = 'notok';
      return {
        status,
      };
    });

export const uploadContent = (body) =>
  callApi({ uriEndPoint: common.uploadContent.v1, body })
    .then((res) => res)
    .catch((err) => err);

export const checkExistingLoginId = (loginId) =>
  callApi({
    uriEndPoint: common.checkExistingLoginId.v1,
    query: {
      user_id: loginId,
    },
  })
    .then((res) => res)
    .catch((err) => err);

export function checkServer() {
  return callApi({
    uriEndPoint: common.checkServer.v1,
  })
    .then((response) => response)
    .catch(() => ({}));
}

export const getDashboardStats = () => callApi({ uriEndPoint: common?.getDashboardStats.v1 });

export const getCountryCode = () => callApi({ uriEndPoint: common?.getCountryCode?.v1 });
export const fetchLocation = () =>
  callApi({ uriEndPoint: common?.fetchLocation?.v1 })
    .then((res) => {
      return res;
    })
    .catch((err) => err);
