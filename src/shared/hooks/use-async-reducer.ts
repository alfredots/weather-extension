import { useReducer } from 'react';

interface State<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

type Action<T> = { type: 'FETCH_START' } | { type: 'FETCH_SUCCESS'; payload: T } | { type: 'FETCH_ERROR' };

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, isError: false, isSuccess: false };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, isError: false, isSuccess: true, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, isError: true, isSuccess: false };
  }
};

export const useAsyncReducer = <T>(initialData: T | null = null) => {
  return useReducer(reducer<T>, {
    data: initialData,
    isLoading: false,
    isError: false,
    isSuccess: false
  });
};
