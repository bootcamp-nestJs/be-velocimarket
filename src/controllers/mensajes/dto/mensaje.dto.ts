import { Product } from "src/controllers/products/entities/Product.entity";
import { Usuario } from "src/controllers/users/entities/user.entity";

export class MensajeDto {
  id: number;
  descripcion: string;
  productoId: number;
  emisoriD: number;
  emisor: Usuario[];
  producto: Product[];

}
