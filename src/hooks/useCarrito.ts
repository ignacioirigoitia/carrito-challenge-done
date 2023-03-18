

import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';




export const useCarrito = () => {

    const { carritoState, addGema, addProduct, removeGema, removeProduct, clearCarrito, setProducts } = useContext( CarritoContext );
    const { carrito, gemas, productos } = carritoState;

    return {
        productos: productos,
        carrito: carrito,
        gemas: gemas,
        addGema,
        setProducts,
        addProduct,
        removeGema,
        removeProduct,
        clearCarrito
    }
}


