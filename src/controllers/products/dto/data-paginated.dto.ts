import { ProductDto } from "./product.dto";

export class PaginatedDto {
  products: ProductDto[];
  page: number;
  pages: number;
  total: number;
}