import { Product } from "src/controllers/products/entities/product.entity";
import { Usuario } from "src/controllers/users/entities/user.entity";

export class MensajeDto {
  id: number;
  descripcion: string;
  emisor: Usuario;
  producto: Product;

}
