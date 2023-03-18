

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: number = 3;

export const validationsSlice = createSlice({
  name: 'validations',
  initialState,
  reducers: {
    // funcion para agregar gemas
    addGema: (state, action: PayloadAction<number>) => {
        return state += action.payload;
    },
    // funcion para remover gemas
    removeGema: (state, action: PayloadAction<number>) => {
        return state -= action.payload;
    },
    // funcion para restablecer por defecto el valor de las gemas
    restoreGemas: (state, action: PayloadAction<void>) => {
        return state = initialState;
    }
}   
});

export const { addGema, removeGema, restoreGemas } = validationsSlice.actions;