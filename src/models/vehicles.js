import {
  createVehicle,
  getAllVehicles,
  addVehicles,
  addVehicles2,
  getSingleVehicleDetails,
  deleteVehicle,
  updateVehicle,
} from '@/services/vehicles';

const Model = {
  namespace: 'vehicles',
  state: {
    vehiclesList: null,
    singleVehicles: null,
    addedVehicleRes: null,
    singleVehicleDetails: null,
  },
  effects: {
    *getAllVehicles({ payload }, { call, put }) {
      try {
        const res = yield call(getAllVehicles, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'vehiclesList',
        });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *createVehicle({ payload }, { call }) {
      try {
        const res = yield call(createVehicle, payload);
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *addVehicles({ payload }, { call, put }) {
      try {
        const res = yield call(addVehicles, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'addedVehicleRes',
        });
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *addVehicles2({ payload }, { call }) {
      try {
        const res = yield call(addVehicles2, payload);
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *getSingleVehicleDetails({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleVehicleDetails, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'addedVehicleRes',
        });
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *deleteVehicle({ payload }, { call }) {
      try {
        const res = yield call(deleteVehicle, payload);

        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *updateVehicle({ payload }, { call }) {
      try {
        const res = yield call(updateVehicle, payload);

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
