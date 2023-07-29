import {
  addVehiclePrices,
  deleteVehiclePrices,
  getPrices,
  updateVehiclePrices,
} from '@/services/prices';

const Model = {
  namespace: 'prices',
  state: {
    pricesList: null,
  },
  effects: {
    *getPrices({ payload }, { call, put }) {
      try {
        const res = yield call(getPrices, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'pricesList',
        });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *addVehiclePrices({ payload }, { call, put }) {
      try {
        const res = yield call(addVehiclePrices, payload);

        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *updateVehiclePrices({ payload }, { call }) {
      try {
        const res = yield call(updateVehiclePrices, payload);

        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *deleteVehiclePrices({ payload }, { call }) {
      try {
        const res = yield call(deleteVehiclePrices, payload);

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
