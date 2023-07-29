import {
  createPaymentLink,
  createPromoCode,
  deletePromoCode,
  getAllPromoCodes,
} from '@/services/payment';

const Model = {
  namespace: 'payments',
  state: {
    promoCodesList: null,
    // analyticsList: null,
  },
  effects: {
    *createPromoCode({ payload }, { call, put }) {
      try {
        const res = yield call(createPromoCode, payload);
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
    *createPaymentLink({ payload }, { call, put }) {
      try {
        const res = yield call(createPaymentLink, payload);
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
    *getAllPromoCodes({ payload }, { call, put }) {
      try {
        const res = yield call(getAllPromoCodes, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'promoCodesList',
        });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *deletePromoCode({ payload }, { call }) {
      try {
        const res = yield call(deletePromoCode, payload);

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
