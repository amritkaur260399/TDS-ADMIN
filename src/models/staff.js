import { acceptInvite, getAllStaff, inviteStaff, updateStaffProfile } from '@/services/staff';
import { changeStatus } from '../services/staff';

const Model = {
  namespace: 'staff',
  state: {
    staffList: null,
  },
  effects: {
    *inviteStaff({ payload }, { call }) {
      try {
        const res = yield call(inviteStaff, payload);

        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *getAllStaff({ payload }, { call, put }) {
      try {
        const res = yield call(getAllStaff, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'staffList',
        });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *acceptInvite({ payload }, { call }) {
      try {
        const res = yield call(acceptInvite, payload);

        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *changeStatus({ payload }, { call }) {
      try {
        const res = yield call(changeStatus, payload);

        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *updateStaffProfile({ payload }, { call }) {
      try {
        const res = yield call(updateStaffProfile, payload);

        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
  },
  reducers: {
    setStates(state, { payload, key }) {
      return {
        ...state,
        [key]: payload,
      };
    },
  },
};
export default Model;
