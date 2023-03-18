

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartAddState {
  id: number,
  nombre: string,
  precio: number,
  categoria: string,
  descripcion: string,
  imagen: string,
}

interface CartRemoveState {
  id: number;
}

const initialState: CartAddState[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // funcion para agregar al carrito un producto validando primero que la lista este vacia
    // o caso contrario si no lo tengo agregado
    addToCart: (state, action: PayloadAction<CartAddState>) => {
      const { id } = action.payload;
      if (
        state.length === 0 ||
        state.filter((item) => item.id === id).length === 0
      ) {
        state.push(action.payload);
      }
    },
    // funcion para remover el item del carrito
    removeToCart: (state, action: PayloadAction<CartRemoveState>) => {
      const { id } = action.payload;
      if(state.some((item)=> item.id === id)){
        return state = state.filter((item)=> item.id !== id)
      }
    },
    // funcion para restablecer los valores por defecto
    clearCart: (state, action: PayloadAction<void>) => {
      return state = [];
    }
  },
});

export const { addToCart, removeToCart, clearCart } = cartSlice.actions;