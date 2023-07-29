import { atom } from 'jotai';

export const modalsJotai = atom({
  addDriver: { name: '', open: false },
  randomServicesAgreement: { name: '', open: false },
  certificateEnrollment: { name: '', open: false },
  DriverClearingHouses: { name: '', open: false },
  CompanyClearingHouses: { name: '', open: false },
  ConfirmModal: {
    name: '',
    open: false,
  },
});
export const addressJotai = atom({ fulladdress: '', addressId: '' });
export const otpJotai = atom({
  verifyModal: {
    name: '',
    open: false,
  },
  verifyPasswordModal: {
    name: '',
    open: false,
  },
});
export const userJotai = atom({});
export const confirmPassordJotai = atom('');
export const userCreateIDJotai = atom('');
export const driverClearingDetailsJotai = atom('');
export const newClientDetailsjotai = atom('');
export const imageBase64 = atom('');
export const driverImageGlobal = atom('');
export const globalSignImageCapture = atom('');
