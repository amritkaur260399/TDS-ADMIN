import {
  queryCurrent,
  updateCurrent,
  userAvatar,
  userRegister,
  forgotUserPassword,
  updateUserPassword,
  updateUserProfile,
  checkExistingUser,
  verifyOtp,
} from '@/services/user';
import { setAuthority } from '@/utils/authority';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
      if (response) {
        setAuthority(response?.role);
        // } else if (response?.is_org_teacher) {
        //   setAuthority('teacher');
        // } else {
        //   setAuthority('user');
      }
    },
    *userRegister({ payload, cb }, { call }) {
      const res = yield call(userRegister, payload);
      if (cb) cb(res);
    },
    *updateCurrent({ payload }, { call }) {
      yield call(updateCurrent, payload);
    },
    *updateUserProfile({ payload }, { call }) {
      const res = yield call(updateUserProfile, payload);
      return res;
    },
    *userAvatarUpload({ payload }, { call }) {
      const res = yield call(userAvatar, payload);
      return res;
    },
    *userForgotPassword({ payload }, { call }) {
      const res = yield call(forgotUserPassword, payload);
      return res;
    },
    *resetUserPassword({ payload }, { call }) {
      const res = yield call(updateUserPassword, payload);
      return res;
    },
    *checkExistingUser({ payload }, { call }) {
      const res = yield call(checkExistingUser, payload);
      return res;
    },
    *verifyOtp({ payload }, { call }) {
      const res = yield call(verifyOtp, payload);
      return res;
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
