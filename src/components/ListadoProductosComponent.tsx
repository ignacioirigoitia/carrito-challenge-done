import React from "react";
import { productos } from '../api/productos';
import { Box, CircularProgress, Grid } from "@mui/material";
import { CardComponent } from "./CardComponent";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setProductos } from '../redux/slices/products.slice';



export const ListadoProductosComponent = () => {

  // variables para utilizar mientras cargan los productos
  const [loading, setLoading] = React.useState<boolean>(true);

  // dispatcher para actualizar variables en redux
  const dispatch = useAppDispatch();

  // lista de productos a mostrar
  const productosToShow = useAppSelector((state) => state.productReducer);

  // funcion que se ejecuta unicamente si no tengo productos en redux
  // en el caso de tener, los muestro directamente para evitar realizar la consulta nuevamente
  React.useEffect(() => {
    if(productosToShow.length === 0){
      setLoading(productosToShow.length === 0);
      productos
        .getAll()
        .then((resp) => {
          dispatch( setProductos(resp.data));
          setTimeout(() => setLoading(false), 1000);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      setLoading(false)
    }
  }, [dispatch, productosToShow.length]);

  return (
    <div>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div>
            {productosToShow!.length !== 0 ? (
              <div>
                <Grid 
                  container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  {productosToShow!.map((producto) => (
                    <Grid key={producto.id} item xs={6}>
                      <CardComponent
                        categoria={producto.categoria}
                        imagen={producto.imagen}
                        nombre={producto.nombre}
                        descripcion={producto.descripcion}
                        precio={producto.precio}
                        id={producto.id}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            ) : (
              "No data"
            )}
          </div>
        </>
      )}
    </div>
  );
};
