import { getQuickBooksurl, createLogin, createCustomer } from '@/services/quickBooks';

const Model = {
  namespace: 'quickBooks',
  state: {
    quickBooksList: null,
  },
  effects: {
    *getQuickBooksurl({ payload }, { call, put }) {
      const res = yield call(getQuickBooksurl, payload);
      yield put({
        type: 'setStates',
        payload: res || [],
        key: 'url',
      });
      return res || [];
    },
    *createLogin({ payload }, { call, put }) {
      try {
        const res = yield call(createLogin, payload);
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
  },
  *createCustomer({ payload }, { call, put }) {
    try {
      const res = yield call(createCustomer, payload);
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

import { useMutation } from '@tanstack/react-query';

export const useQuickBooksCreateCustomer = () => {
  return useMutation((payload) => createCustomer(payload));
};
