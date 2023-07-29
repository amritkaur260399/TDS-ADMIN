import { getAllServices, getSingleService, updateService } from '@/services/service';

const Model = {
  namespace: 'service',
  state: {
    allServicesList: null,
    singleServiceDetails: null,
  },
  effects: {
    *getAllServices({ payload }, { call, put }) {
      try {
        const res = yield call(getAllServices, payload);

        yield put({
          type: 'setStates',
          payload: res,
          key: 'allServicesList',
        });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },

    *getSingleService({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleService, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'singleServiceDetails',
        });
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },

    *updateService({ payload }, { call }) {
      try {
        const res = yield call(updateService, payload);
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
