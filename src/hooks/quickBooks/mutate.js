import { createCustomer } from '@/services/quickBooks';
import { useMutation } from '@tanstack/react-query';

export const useCreateCustomer = () => {
  return useMutation((payload) => createCustomer(payload));
};
