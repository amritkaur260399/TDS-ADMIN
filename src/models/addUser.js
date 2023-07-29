import {
  confirmPassword,
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  verifyOtp,
  verifyPassword,
} from '@/services/addUser';
import { message } from 'antd';

const Model = {
  namespace: 'addUser',
  state: {
    usersList: null,
  },
  effects: {
    *getAllUsers({ payload }, { call, put }) {
      try {
        const res = yield call(getAllUsers, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'usersList',
        });
        console.log('res', res);
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *verifyOtp({ payload }, { call }) {
      try {
        const res = yield call(verifyOtp, payload);
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *verifyPassword({ payload }, { call }) {
      try {
        const res = yield call(verifyPassword, payload);
        return res;
      } catch (error) {
        Promise.reject(error);
        message.error(error?.data?.message);
      }
    },
    *updateUser({ payload }, { call }) {
      try {
        const res = yield call(updateUser, payload);
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *createUser({ payload }, { call }) {
      try {
        const res = yield call(createUser, payload);
        console.log('res', res);
        return res;
      } catch (error) {
        // console.log('fir444', error?.data?.message)
        Promise.reject(error);
        message.error(error?.data?.message);
      }
    },
    *confirmPassword({ payload }, { call }) {
      try {
        const res = yield call(confirmPassword, payload);
        console.log('res', res);
        return res;
      } catch (error) {
        // console.log('fir444', error?.data?.message)
        Promise.reject(error);
        message.error(error?.data?.message);
      }
    },
    *getSingleUser({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleUser, payload);
        yield put({
          type: 'setStates',
          payload: res || [],
          key: 'singleUser',
        });
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *deleteUser({ payload }, { call, put }) {
      try {
        const res = yield call(deleteUser, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'deleteUser',
        });
        return res;
      } catch (err) {
        Promise.reject(err);
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
