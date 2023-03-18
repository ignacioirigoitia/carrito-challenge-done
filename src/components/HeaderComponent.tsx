import { useAppSelector } from '../redux/hooks';

type Props = {
  setState: React.Dispatch<React.SetStateAction<any>>;
};

export const HeaderComponent: React.FC<Props> = ({ setState }) => {

  // variable para saber cuantos items tengo en el carrito
  const items = useAppSelector((state) => state.cartReducer);

  // variable para saber cuantas gemas me quedan disponibles
  const gemas = useAppSelector((state) => state.validationReducer);

  return (
    <div className="bg-stone-700 py-4 px-8 flex justify-between items-center sticky top-0 shadow-md z-10">
      <h1 className="text-white text-2xl font-bold">🧙‍♂️ Potion Shop</h1>
      <div className="flex gap-2 items-center">
        <img src="./gem.png" alt="gema" />
        <span>{gemas} Gemas</span>
      </div>
      <button className="text-white hover:underline" onClick={setState}  >Ver Carrito ({items.length})</button>
    </div>
  );
};
