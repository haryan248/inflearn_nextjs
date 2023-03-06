import { useCallback } from 'react';
import { Store } from '../types/store';
import { mutate } from 'swr';

export const STORE_KEY = '/stores';

const useStores = () => {
  const initializeStores = useCallback((stores: Store[]) => {
    mutate(STORE_KEY, stores);
  }, []);

  return {
    initializeStores,
  };
};
export default useStores;
