import { callApi } from '@/utils/apiUtils';
import { staff } from '@/utils/endpoints/staff';

export const inviteStaff = ({ body }) =>
  callApi({ uriEndPoint: staff.inviteStaff.v1, body }).then((res) => {
    return res;
  });
export const getAllStaff = ({ query }) =>
  callApi({ uriEndPoint: staff.getAllStaff.v1, query }).then((res) => {
    return res;
  });
export const acceptInvite = ({ body, headerProps }) =>
  callApi({ uriEndPoint: staff.acceptInvite.v1, body, headerProps }).then((res) => {
    return res;
  });
export const changeStatus = ({ body, pathParams }) =>
  callApi({ uriEndPoint: staff.changeStatus.v1, body, pathParams }).then((res) => {
    return res;
  });
export const updateStaffProfile = ({ body, pathParams }) =>
  callApi({ uriEndPoint: staff.updateStaffProfile.v1, body, pathParams }).then((res) => {
    return res;
  });
