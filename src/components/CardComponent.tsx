

import { useState, useEffect } from 'react';
import { TypeProducto } from './interface/producto.interface';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
  } from '@mui/material';

import { useCarrito } from '../hooks/useCarrito';

export const CardComponent: React.FC<TypeProducto> = ({
  imagen,
  nombre,
  precio,
  categoria,
  descripcion,
  id,
}) => {

  // estado para habilitar o deshabilitar boton de agregar al carrito segun validaciones
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  const { carrito, gemas, addProduct, removeGema } = useCarrito();

  useEffect(() => {
    setDisabledBtn(carrito.some((item) => item.id === id) || (gemas < precio));
  }, [id, gemas, precio, carrito]);

  // funcion para agregar al carrito y remover las gemas correspondientes
  const handleAddToCart = () => {
    addProduct({
      id,
      nombre,
      categoria,
      imagen,
      precio,
      descripcion
    });
    removeGema(precio)
  };
  
  return (
    <Card 
        sx={{
            ':hover': {
            border: "2px solid purple"
            },
        }}
        style={{
            backgroundColor: "rgb(52,49,45)", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            padding: "10px",
            height: "330px"
        }}
    >
        <div style={{
            backgroundColor: "green",
            padding: "0px 10px",
            borderRadius: 20,
            marginBottom: 10,
            alignSelf: "end"
        }} >
            <p style={{color: "white", fontSize: "16px"}} >{precio} Gema</p>
        </div>
        <CardMedia>
            <img src={imagen} alt={nombre} style={{height: 80}}/>
        </CardMedia>
        <CardContent>
            <Typography variant="h6" color={"white"} fontWeight={"bold"} fontSize={14} sx={{ mb: 0.5 }}>
            {nombre}
            </Typography>
            <Typography sx={{ mt: 0.5 }}>
                <span style={{ fontSize: "13px", color: "grey" }} >{descripcion}</span>
            </Typography>
        </CardContent>
        <CardActions>
        <Button
            sx={{
              ':hover': {
                height: 40
              },
            }}
            style={{
                width: 200,
                textTransform: 'none',
                borderRadius: 35,
                backgroundColor: disabledBtn ? "grey" : "purple",
                padding: "5px 20px",
                color: "#fff"
            }}
            size="small"
            disabled={disabledBtn}
            onClick={handleAddToCart}
        >
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
};