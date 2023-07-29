import {
  createClient,
  getAllClients,
  getSingleClientDetails,
  updateClient,
  deleteClientDetails,
  addNotes,
  deleteNotes,
  captureSignature,
} from '@/services/client';

const Model = {
  namespace: 'client',
  state: {
    clientList: null,
  },
  effects: {
    *createClient({ payload }, { call, put }) {
      try {
        const res = yield call(createClient, payload);
        // yield put({
        //   type: 'setStates',
        //   payload: res,
        //   key: 'promo',
        // });
        return res;
      } catch (error) {
        console.log('error46546546', error);
        Promise.reject(error);
      }
    },
    *getAllClients({ payload }, { call, put }) {
      const res = yield call(getAllClients, payload);
      yield put({
        type: 'setStates',
        payload: res || [],
        key: 'allClientList',
      });
      return res || [];
    },
    *updateClient({ payload }, { call }) {
      try {
        const res = yield call(updateClient, payload);
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *captureSignature({ payload }, { call }) {
      try {
        const res = yield call(captureSignature, payload);
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *getSingleClientDetails({ payload }, { call, put }) {
      try {
        const res = yield call(getSingleClientDetails, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'singleClientDetails',
        });
        return res;
      } catch (err) {
        Promise.reject(err);
      }
    },
    *deleteClientDetails({ payload }, { call }) {
      try {
        const res = yield call(deleteClientDetails, payload);

        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *addNotes({ payload }, { call, put }) {
      try {
        const res = yield call(addNotes, payload);
        // yield put({
        //   type: 'setStates',
        //   payload: res,
        //   key: 'promo',
        // });
        return res;
      } catch (error) {
        console.log('error46546546', error);
        Promise.reject(error);
      }
    },
    *deleteNotes({ payload }, { call }) {
      try {
        const res = yield call(deleteNotes, payload);

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
