import {
  createDriver,
  getAllDrivers,
  getSingleDriverDetails,
  updateDriver,
  deleteDriverDetails,
  updateDriverStatus,
  createImage,
} from '@/services/driver';

const Model = {
  namespace: 'driver',
  state: {
    allDriversList: null,
    //   clientList:null,
  },
  effects: {
    *createDriver({ payload }, { call, put }) {
      try {
        const res = yield call(createDriver, payload);
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
    *createImage({ payload }, { call, put }) {
      try {
        const res = yield call(createImage, payload);
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
    *getAllDrivers({ payload }, { call, put }) {
      try {
        const res = yield call(getAllDrivers, payload);

        yield put({
          type: 'setStates',
          payload: res || [],
          key: 'allDriversList',
        });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *getSingleDriverDetails({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleDriverDetails, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'singleDriverDetails',
        });
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },

    *updateDriver({ payload }, { call }) {
      try {
        const res = yield call(updateDriver, payload);
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *updateDriverStatus({ payload }, { call }) {
      try {
        const res = yield call(updateDriverStatus, payload);
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *deleteDriverDetails({ payload }, { call }) {
      try {
        const res = yield call(deleteDriverDetails, payload);

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
