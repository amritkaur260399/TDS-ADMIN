import {
  createRide,
  getRides,
  getSingleRideDetails,
  updateRide,
  deleteRide,
} from '@/services/rides';

const Model = {
  namespace: 'rides',
  state: {
    ridesList: null,
    singleRideDetail: null,
  },
  effects: {
    *getRides({ payload }, { call, put }) {
      try {
        const res = yield call(getRides, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'ridesList',
        });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *createRide({ payload }, { call }) {
      try {
        const res = yield call(createRide, payload);
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *getSingleRideDetails({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleRideDetails, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'singleRideDetail',
        });
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *updateRide({ payload }, { call }) {
      try {
        const res = yield call(updateRide, payload);
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *deleteRide({ payload }, { call }) {
      try {
        const res = yield call(deleteRide, payload);

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
