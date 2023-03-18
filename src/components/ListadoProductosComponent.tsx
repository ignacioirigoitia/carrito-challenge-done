import React from "react";
import { productos } from '../api/productos';
import { Box, CircularProgress, Grid } from "@mui/material";
import { CardComponent } from "./CardComponent";
import { useCarrito } from '../hooks/useCarrito';



export const ListadoProductosComponent = () => {

  // variables para utilizar mientras cargan los productos
  const [loading, setLoading] = React.useState<boolean>(true);

  const { productos: productosToShow, setProducts } = useCarrito();
  React.useEffect(() => {
    if(productosToShow.length === 0){
      setLoading(productosToShow.length === 0);
      productos
        .getAll()
        .then((resp) => {
          // dispatch( setProductos(resp.data));
          setProducts(resp.data);
          setTimeout(() => setLoading(false), 1000);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      setLoading(false)
    }
  }, [productosToShow.length, setProducts]);

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
