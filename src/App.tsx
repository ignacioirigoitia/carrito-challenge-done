import { useState } from "react";
import { CarritoComponent } from "./components/CarritoComponent";
import { HeaderComponent } from "./components/HeaderComponent";
import { ListadoProductosComponent } from "./components/ListadoProductosComponent";
import { CarritoProvider } from './context/CarritoProvider';

function App() {
  const [showCarrito, setShowCarrito] = useState(false);

  const handleShow = () => {
    setShowCarrito(!showCarrito)
  }

  return (
    <CarritoProvider>
      <div
        className="min-h-full bg-fixed"
        style={{ backgroundImage: "url(background.webp)" }}
      >
        <HeaderComponent 
          setState={handleShow}
        />
        <div className="flex justify-center min-h-full">
          <div className="max-w-lg w-full py-16">
            {showCarrito ? <CarritoComponent setState={handleShow} /> : <ListadoProductosComponent />}
          </div>
        </div>
      </div>
    </CarritoProvider>
  );
}

export default App;
