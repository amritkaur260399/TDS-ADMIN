import { atom } from 'jotai';

export const socketDetail = atom<any>({});

export const messagesRefetch = atom(false);
export const message = atom({});
export const liveLocation = atom({});

