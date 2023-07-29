import { getAnalytics } from '@/services/analytics';

const Model = {
  namespace: 'analytics',
  state: {
    analyticsList: null,
  },
  effects: {
    *getAnalytics({ payload }, { call, put }) {
      try {
        const res = yield call(getAnalytics, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'analyticsList',
        });
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
