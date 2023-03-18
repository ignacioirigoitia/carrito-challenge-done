
import { TypeProducto } from '../components/interface/producto.interface';

type CarritoAction = 
    | { type: 'addProduct', payload: TypeProducto }
    | { type: 'removeProduct', payload: { id: number } }
    | { type: 'clearCarrito', payload: any }
    | { type: 'setProducts', payload: TypeProducto[] }
    | { type: 'addGema', payload: number }
    | { type: 'removeGema', payload: number };

export type CarritoState = {
    carrito: TypeProducto[],
    gemas: number,
    productos: TypeProducto[]
}


export const carritoReducer = ( state: CarritoState, action: CarritoAction ): CarritoState => {

    switch ( action.type ) {
        case 'addProduct':
            return {
                ...state, 
                carrito: [ ...state.carrito, action.payload ],
            }

        case 'removeProduct': 
            const { id } = action.payload;
            if(state.carrito.some((item)=> item.id === id)){
                state.carrito = state.carrito.filter((item)=> item.id !== id)
            }
            return state;

        case 'clearCarrito':
            return {
                ...state,
                carrito: [],
                gemas: 3
            }

        case 'setProducts': 
            return {
                ...state,
                productos: action.payload
            }

        case 'addGema': 
            return {
                ...state,
                gemas: state.gemas += action.payload
            }

        case 'removeGema': 
            return {
                ...state,
                gemas: state.gemas -= action.payload
            }
            
        default:
            return state;
    }

}