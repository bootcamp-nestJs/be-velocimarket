import { Products } from "src/products/interfaces/products-interfaces";
import { v4 as uuid } from 'uuid';

export const PRODUCT_SEED: Products[] =  [
  {
    nombre : "Cadena",
    categoria : "Cadenas",
    descripcion : "cadena de bicicleta",
    id : uuid(),
    precio : 25000,
    fechaCreacion: Date().toString(),
    fechaModificacion: Date().toString(),
    marca: "Trek",
    imagen: ""
  }
];