import {
  getAllChauffeur,
  getSingleChauffeur,
  verifyChauffeur,
  assignVehicle,
  updateDocuments,
} from '@/services/chauffeur';

const Model = {
  namespace: 'chauffeur',
  state: {
    chauffeurList: null,
    singleChauffeur: null,
  },
  effects: {
    *getAllChauffeur({ payload }, { call, put }) {
      try {
        const res = yield call(getAllChauffeur, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'chauffeurList',
        });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *verifyChauffeur({ payload }, { call }) {
      try {
        const res = yield call(verifyChauffeur, payload);
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *getSingleChauffeur({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleChauffeur, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'singleChauffeur',
        });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *assignVehicle({ payload }, { call }) {
      try {
        const res = yield call(assignVehicle, payload);
        // yield put({
        //   type: 'setStates',
        //   payload: res,
        //   key: '',
        // });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *updateDocuments({ payload }, { call }) {
      try {
        const res = yield call(updateDocuments, payload);
        // yield put({
        //   type: 'setStates',
        //   payload: res,
        //   key: '',
        // });
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
