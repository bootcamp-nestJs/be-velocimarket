import { Imagen } from "../entities/imagen.entity";
import { ProductDto } from "./product.dto";

export class TotalProductDto {
    products : ProductDto[];
    page: number;
    pages: number;
    total: number;
}
