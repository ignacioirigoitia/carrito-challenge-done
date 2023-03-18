



import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import { removeToCart } from '../redux/slices/cart.slice';
import { addGema } from '../redux/slices/validations.slice';


type TypeCart = {
    imagen: string,
    nombre: string,
    id: number,
    precio: number
}


export const CartItemComponent: React.FC<TypeCart> = ({
  nombre,
  id,
  imagen,
  precio
}) => {

  // dispatcher para actualizar variables en redux
  const dispatch = useAppDispatch();

  // funcion para remover del carrito un item y agrego la gema correspondiente
  const handleRemoveCart = (id: number) => {
    dispatch(
      removeToCart({
        id: id
      })
    );
    dispatch(addGema(precio))
  };



  return (
    <div style={{
        backgroundColor: 'rgb(52,49,45)',
        padding: 10,
        borderBottom: "1px solid white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }} >

    <div style={{
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    }} >
        <img src={imagen} alt={nombre} />
    </div>

    <p>{nombre}</p>

    <button onClick={() => handleRemoveCart(id)} style={{ color: "grey" }} >X</button>

    </div>
  );
};