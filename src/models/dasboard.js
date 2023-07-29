import { getCounts } from '@/services/dasboard';

const Model = {
  namespace: 'count',
  state: {
    countList: null,
  },
  effects: {
    *getCounts({ payload }, { call, put }) {
      try {
        const res = yield call(getCounts, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'countList',
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
