import {
  createClearingHouse,
  getAllCompanyClearingHouse,
  updateCompanyClearingHouse,
  getSingleCompanyClearingHouse,
  deleteCompanyClearingHouse,
  createDriverClearingHouse,
  getAllDriverClearingHouse,
  updateDriverClearingHouse,
  getSingleDriverClearingHouse,
  deleteDriverClearingHouse,
} from '@/services/clearingHouse';

const Model = {
  namespace: 'clearingHouse',
  state: {
    clearingHouseList: null,
  },
  effects: {
    *createClearingHouse({ payload }, { call, put }) {
      try {
        const res = yield call(createClearingHouse, payload);
        // yield put({
        //   type: 'setStates',
        //   payload: res,
        //   key: 'promo',
        // });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *createDriverClearingHouse({ payload }, { call, put }) {
      try {
        const res = yield call(createDriverClearingHouse, payload);
        // yield put({
        //   type: 'setStates',
        //   payload: res,
        //   key: 'promo',
        // });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *getAllCompanyClearingHouse({ payload }, { call, put }) {
      const res = yield call(getAllCompanyClearingHouse, payload);
      yield put({
        type: 'setStates',
        payload: res || [],
        key: 'allCompanyClearingHouseList',
      });
      return res || [];
    },
    *getAllDriverClearingHouse({ payload }, { call, put }) {
      const res = yield call(getAllDriverClearingHouse, payload);
      yield put({
        type: 'setStates',
        payload: res || [],
        key: 'allDriverClearingHouseList',
      });
      return res || [];
    },
    *updateCompanyClearingHouse({ payload }, { call }) {
      try {
        const res = yield call(updateCompanyClearingHouse, payload);
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *getSingleCompanyClearingHouse({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleCompanyClearingHouse, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'SingleCompanyClearingHouseDetails',
        });
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *deleteCompanyClearingHouse({ payload }, { call }) {
      try {
        const res = yield call(deleteCompanyClearingHouse, payload);

        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *updateDriverClearingHouse({ payload }, { call }) {
      try {
        const res = yield call(updateDriverClearingHouse, payload);
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *getSingleDriverClearingHouse({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleDriverClearingHouse, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'SingleDriverClearingHouseDetails',
        });
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *deleteDriverClearingHouse({ payload }, { call }) {
      try {
        const res = yield call(deleteDriverClearingHouse, payload);

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
