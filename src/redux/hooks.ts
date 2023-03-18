

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// dispatcher para actualizar las variables de los slices
export const useAppDispatch: () => AppDispatch = useDispatch;

// selector para obtener las variables de los slices
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;