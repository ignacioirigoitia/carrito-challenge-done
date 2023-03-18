

import { instance } from "./base.api";


export const productos = {
  getAll: function () {
    return instance.get('productos');
  },
  buyProduct: function( products: any ){
    console.log(products);
    return instance.post('compras', products)
  }
};