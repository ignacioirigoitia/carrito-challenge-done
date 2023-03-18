import { useReducer } from 'react';
import { TypeProducto } from '../components/interface/producto.interface';
import { CarritoContext } from './CarritoContext';
import { carritoReducer, CarritoState } from './CarritoReducer';


const initialState: CarritoState = {
    carrito: [],
    gemas: 3,
    productos: []
};

interface props {
    children: JSX.Element | JSX.Element[]
}

export const CarritoProvider = ({ children }: props ) => {

    const [ carritoState, dispatch] = useReducer( carritoReducer, initialState );

    const addProduct = ( producto: TypeProducto ) => {
        dispatch({ type: 'addProduct', payload: producto })
    }
    const removeProduct = ( id: number ) => {
        dispatch({ type: 'removeProduct', payload: { id } })
    }
    const clearCarrito = (  ) => {
        dispatch({ type: 'clearCarrito', payload: {} })
    }
    const setProducts = ( productos: TypeProducto[] ) => {
        dispatch({ type: 'setProducts', payload: productos })
    }
    const addGema = ( count: number ) => {
        dispatch({ type: 'addGema', payload: count })
    }
    const removeGema = ( count: number ) => {
        dispatch({ type: 'removeGema', payload: count })
    }

    return (
        <CarritoContext.Provider value={{
            carritoState,
            addProduct,
            removeProduct,
            clearCarrito,
            setProducts,
            addGema,
            removeGema
        }}>
            { children }
        </CarritoContext.Provider>
    )
}