import { Product } from "src/controllers/products/entities/product.entity";


export class CartDto {
    id: number;
    usuarioId: number;
    valorEnvio: number;
    totalCarrito: number;
    medioPago: string;
    productos: Product[];
    
}