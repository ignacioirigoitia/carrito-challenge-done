

import { createContext } from "react";
import { TypeProducto } from '../components/interface/producto.interface';
import { CarritoState } from "./CarritoReducer";


export type CarritoContextProps = {
    carritoState: CarritoState;
    addProduct: ( producto: TypeProducto ) => void;
    removeProduct: ( id: number ) => void;
    clearCarrito: () => void;
    setProducts: (productos: TypeProducto[]) => void;
    addGema: ( count: number ) => void;
    removeGema: ( count: number ) => void;
} 


export const CarritoContext = createContext<CarritoContextProps>({} as CarritoContextProps );