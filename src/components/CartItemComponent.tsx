



import React from 'react';
import { useCarrito } from '../hooks/useCarrito';


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

  const { removeProduct, addGema } = useCarrito();

  // funcion para remover del carrito un item y agrego la gema correspondiente
  const handleRemoveCart = () => {
    removeProduct(id);
    addGema(precio);
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

    <button onClick={() => handleRemoveCart()} style={{ color: "grey" }} >X</button>

    </div>
  );
};