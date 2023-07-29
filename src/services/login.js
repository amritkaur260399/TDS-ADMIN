import { hostname } from '@/utils/apiUtils';
import request from '@/utils/request';
import Axios from 'axios';

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export const userLogin = ({ apiKey, body }) =>
  Axios({
    method: 'post',
    url: `${hostname()}/api/adminPanel/auth/login`,
    data: body,
    timeout: 10000,
  })
    .then((response) => {
      localStorage.setItem('authorization', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return {
        status: 'ok',
        resp: response,
        authorization: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    })
    .catch((err) => ({
      status: 'notok',
      currentAuthority: 'guest',
      error: err.response,
    }));
