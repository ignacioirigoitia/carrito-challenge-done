import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { Button, Grid } from '@mui/material';
import { CartItemComponent } from './CartItemComponent';
import { useState } from 'react';
import { restoreGemas } from '../redux/slices/validations.slice';
import { clearCart } from '../redux/slices/cart.slice';
import { productos } from '../api/productos';

type Props = {
  setState: React.Dispatch<React.SetStateAction<any>>;
};


export const CarritoComponent: React.FC<Props> = ({ setState }) => {

  // items del carrito
  const items = useAppSelector((state) => state.cartReducer);

  // variables para tener el boton habilitado o deshabilitado
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  // variables para saber si terminamos de comprar y mostrar el mensaje
  const [buyDone, setBuyDone] = useState<boolean>(false);

  // dispatcher para actualizar variables en redux
  const dispatch = useAppDispatch();

  // funcion de compra, primero valido que haya items para comprar y luego realizo la compra y 
  // refresco las variables a su estado inicial
  const handleOnSubmit = () => {
    if(items.length > 0){
      const data : number[] = [];
      for (let i = 0; i < items.length; i++) {
        data.push(items[i].id);
      }
      productos.buyProduct({ "itemsId": data })
        .then(resp => {
          dispatch( restoreGemas() );
          dispatch( clearCart() );
          setBuyDone(true);
          setDisabledBtn(true);
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <div>
      <button 
        onClick={setState}
        style={{
          backgroundColor: "purple",
          color: "white",
          padding: "5px 20px",
          borderRadius: 20,
          marginBottom: 10,
        }} >Volver
      </button>
      <Grid container columns={16}>
        <Grid item xs={16}>
          {
            items.map((producto) => (
              <CartItemComponent 
                key={producto.id}
                nombre={producto.nombre}
                imagen={producto.imagen}
                id={producto.id}
                precio={producto.precio}
              />
            ))
          }
        </Grid>
      </Grid>

      {
        buyDone 
          ? <div style={{ marginTop: 20 }}>
              <p>Gracias por su compra!</p>
            </div>
          : <div></div>
      }

      <Button
        sx={{
          ':hover': {
            height: 40
          },
        }}
        style={{
            marginTop: 20,
            textTransform: 'none',
            borderRadius: 35,
            backgroundColor: disabledBtn ? "grey" : "purple",
            padding: "5px 20px",
            color: "#fff"
        }}
        fullWidth={true}
        disabled={disabledBtn}
        onClick={handleOnSubmit}
      >
        Comprar
      </Button>

    </div>
  );
};
