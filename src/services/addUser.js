import { callApi } from '@/utils/apiUtils';
import { addUser } from '@/utils/endpoints/addUser';

export const createUser = ({ body }) =>
  callApi({ uriEndPoint: addUser.createUser.v1, body }).then((res) => {
    return res;
  });

export const getAllUsers = ({ body, query }) =>
  callApi({ uriEndPoint: addUser.getAllUsers.v1, body, query });

// export const updateDriver = ({ body, pathParams }) =>
//   callApi({ uriEndPoint: driver.updateDriver.v1, body, pathParams });
export const updateUser = ({ body, pathParams }) =>
  callApi({ uriEndPoint: addUser.updateUser.v1, body, pathParams });

export const getSingleUser = ({ pathParams }) =>
  callApi({ uriEndPoint: addUser.getSingleUser.v1, pathParams });

export const deleteUser = ({ pathParams }) =>
  callApi({ uriEndPoint: addUser.deleteUser.v1, pathParams }).then((res) => {
    return res;
  });
export const verifyOtp = ({ body }) => callApi({ uriEndPoint: addUser.verifyOtp.v1, body });
export const verifyPassword = ({ body }) =>
  callApi({ uriEndPoint: addUser.verifyPassword.v1, body });
export const confirmPassword = ({ body }) =>
  callApi({ uriEndPoint: addUser.confirmPassword.v1, body });
