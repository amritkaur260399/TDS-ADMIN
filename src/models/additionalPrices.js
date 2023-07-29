import {
  addAdditionalPrices,
  deleteAdditionalPrices,
  getAdditionalPrices,
  updateAdditionalPrices,
} from '@/services/additionalPrices';

const Model = {
  namespace: 'additionalPrices',
  state: {
    additionalPricesList: null,
  },
  effects: {
    *getAdditionalPrices({ payload }, { call, put }) {
      try {
        const res = yield call(getAdditionalPrices, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'additionalPricesList',
        });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *addAdditionalPrices({ payload }, { call }) {
      try {
        const res = yield call(addAdditionalPrices, payload);

        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *updateAdditionalPrices({ payload }, { call }) {
      try {
        const res = yield call(updateAdditionalPrices, payload);

        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *deleteAdditionalPrices({ payload }, { call }) {
      try {
        const res = yield call(deleteAdditionalPrices, payload);

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
