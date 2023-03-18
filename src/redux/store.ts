import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './slices/cart.slice';
import { productoSlice } from './slices/products.slice';
import { validationsSlice } from './slices/validations.slice';


export const store = configureStore({
  // configuracion de los reducer utilizados por los hooks para obtener y refrescar las variables globales
  reducer: {
    cartReducer: cartSlice.reducer,
    productReducer: productoSlice.reducer,
    validationReducer: validationsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;