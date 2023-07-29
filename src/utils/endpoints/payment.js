const { defaults } = require('./defaults');

export const payments = {
  createPromoCode: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/stripe/stripe-promo-code/add-promo-code',
    },
  },
  createPaymentLink: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/adminPanel/stripe/stripe-payment-link/create-payment-link',
    },
  },
  getAllPromoCodes: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/adminPanel/stripe/promoCodes/getAllPromoCodes',
    },
  },
  deletePromoCode: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/adminPanel/stripe/deletePromoCode/deletePromoCode',
    },
  },
};
