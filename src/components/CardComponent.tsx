

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToCart } from '../redux/slices/cart.slice';
import { TypeProducto } from './interface/producto.interface';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
  } from '@mui/material';
import { removeGema } from '../redux/slices/validations.slice';


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

  // dispatcher para actualizar variables en redux
  const dispatch = useAppDispatch();

  // listado de items para saber si ya lo tenemos agregado al carrito
  const itemExist = useAppSelector((state) => state.cartReducer);

  // las gemas disponibles para agregar
  const gemas = useAppSelector((state) => state.validationReducer);

  // setea el valor para saber si el boton puede estar habilitado o no validando el id
  // o si las gemas son menos a lo que me vale el producto
  useEffect(() => {
    setDisabledBtn(itemExist.some((item) => item.id === id) || (gemas < precio));
  }, [itemExist, id, gemas, precio]);

  // funcion para agregar al carrito y remover las gemas correspondientes
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        nombre,
        categoria,
        imagen,
        precio,
        descripcion
      })
    );
    dispatch(removeGema(precio));
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