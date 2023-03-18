

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Producto {
  id: number,
  nombre: string,
  precio: number,
  categoria: string,
  descripcion: string,
  imagen: string,
}

const initialState: Producto[] = [];

export const productoSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    // funcion para agregar a la lista de productos un producto validando primero que la lista este vacia
    // o caso contrario si no lo tengo agregado
    setProductos: (state, action : PayloadAction<Producto[]>) => {
      for (let i = 0; i < action.payload.length; i++) {
        const producto = action.payload[i];
        const { id } = action.payload[i];
        if (
          state.length === 0 ||
          state.filter((item) => item.id === id).length === 0
        ) {
          state.push(producto); 
        }
      }
    },  
  }
});

export const { setProductos } = productoSlice.actions;