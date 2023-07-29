import apiEndPoints from '@/utils/apiEndPoints';
import { callApi, hostname } from '@/utils/apiUtils';
import Axios from 'axios';

export const userRegister = (body) =>
  Axios.post(`${hostname()}/api/adminPanel/SignUpUsers`, body)
    .then((result) => result?.data)
    .catch((err) => {
      console.log('err', err);
    });

export const checkEmail = (path) =>
  Axios.post(`${hostname()}/xapi/v1/user/isExistingLoginId?user_id=${path}`);

export const queryCurrent = () =>
  callApi({ uriEndPoint: apiEndPoints.user.fetchCurrent.v1 })
    .then((res) => res)
    .catch(() => {});

export const updateCurrent = ({ body }) =>
  callApi({ uriEndPoint: apiEndPoints.user.updateCurrent.v1, body })
    .then((res) => res)
    .catch(() => {});

export const userAvatar = ({ body, pathParams }) =>
  callApi({ uriEndPoint: apiEndPoints.user.uploadAvatar.v1, body, pathParams })
    .then((res) => res)
    .catch(() => {});

export const updateUserProfile = ({ body }) =>
  callApi({ uriEndPoint: apiEndPoints.user.updateProfile.v1, body })
    .then((res) => res)
    .catch(() => {});

export const forgotUserPassword = ({ body, query }) =>
  callApi({ uriEndPoint: apiEndPoints.user.forgotPassword.v1, body, query })
    .then((res) => res)
    .catch(() => {});

export const updateUserPassword = ({ body, query }) =>
  callApi({ uriEndPoint: apiEndPoints.user.updatePassword.v1, body, query });

export const checkExistingUser = ({ body, query }) =>
  callApi({ uriEndPoint: apiEndPoints.user.checkExistingUser.v1, body, query })
    .then((res) => res)
    .catch(() => {});

export const verifyOtp = ({ body }) =>
  callApi({ uriEndPoint: apiEndPoints.user.verifyOtp.v1, body })
    .then((res) => res)
    .catch(() => {});
