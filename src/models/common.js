import {
  getCountriesList,
  getCountryStates,
  uploadContent,
  getDashboardStats,
  getCountryCode,
  fetchLocation,
} from '@/services/common';

const Model = {
  namespace: 'common',
  state: {
    stateCodes: null,
    contentId: null,
    countryCode: null,
  },
  effects: {
    *getStateCodes({ payload }, { call, put }) {
      const res = yield call(getCountryStates, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'stateCodes',
      });
    },
    *getDashboardStats({ payload }, { call, put }) {
      let res;
      try {
        res = yield call(getDashboardStats, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'dashboardStats',
        });
      } catch (err) {
        return Promise.reject(err);
      }
      return res;
    },
    *getCountriesList({ payload }, { call, put }) {
      const res = yield call(getCountriesList, payload);
      yield put({
        type: 'setStates',
        payload: res?.data || [],
        key: 'countriesList',
      });
      return res?.data || [];
    },
    *uploadContent({ payload }, { call, put }) {
      const res = yield call(uploadContent, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'contentId',
      });
      return res;
    },
    *getCountryCode({ payload }, { call, put }) {
      const res = yield call(getCountryCode, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'countryCode',
      });
      return res;
    },
    *fetchLocation({ payload }, { call }) {
      const res = yield call(fetchLocation, payload);

      return res;
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
