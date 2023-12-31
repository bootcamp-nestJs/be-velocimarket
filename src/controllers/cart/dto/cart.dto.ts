import { ProductDto } from "src/controllers/products/dto/product.dto";
import { Product } from "src/controllers/products/entities/product.entity";
import { UserDto } from "src/controllers/users/dto/user.dto";
import { Usuario } from "src/controllers/users/entities/user.entity";

export class CartDto {
    id: number;
    usuarioId: number;
    valorEnvio: number;
    totalCarrito: number;
    medioPago: string;
    productos: Product[];
    
}