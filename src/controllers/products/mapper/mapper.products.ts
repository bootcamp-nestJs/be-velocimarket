import { CreateProductImage } from "../dto/create-image.dto";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductDto } from "../dto/product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Imagen } from "../entities/imagen.entity";
import { Product } from "../entities/product.entity";

export class ProductMapper {

  static toDto(entity: Product): ProductDto {
    if (!entity) {
      return null;
    }
    const dto =  new ProductDto();
    dto.id = entity.id;
    dto.nombre= entity.nombre;
    dto.precio= entity.precio;
    dto.marca= entity.marca;
    dto.tamanio= entity.tamanio;
    dto.estado= entity.estado;
    dto.material_cuadro= entity.material_cuadro;
    dto.componentes= entity.componentes;
    dto.valoracion= entity.valoracion;
    dto.img = entity.img;
    dto.cat = entity.subcat.descripcion;
    return dto;
  }

  static toDtoList(entities: Product[]): ProductDto[] {
    return entities.map(entity => this.toDto(entity));
  }

  static toEntity(dto: CreateProductDto): Product {
    if (!dto) {
      return null;
    }
    const entity =  new Product();
    entity.nombre= dto.nombre;
    entity.categoria_id= dto.categoria;
    entity.precio= dto.precio;
    entity.marca= dto.marca;
    entity.tamanio=dto.tamanio;
    entity.estado= dto.estado;
    entity.descripcion= dto.descripcion;
    entity.material_cuadro= dto.material_cuadro;
    entity.componentes=dto.componentes;
    entity.valoracion= dto.valoracion;
    const date = new Date
    entity.fecha_creacion = date;
    return entity;
  }  

  static toUpdateEntity(id: number, dto: UpdateProductDto): Product {
    if (!dto) {
      return null;
    }
    const entity =  new Product();
    entity.id= id;
    entity.nombre= dto.nombre;
    entity.categoria_id= dto.categoria;
    entity.precio= dto.precio;
    entity.marca= dto.marca;
    entity.tamanio=dto.tamanio;
    entity.estado= dto.estado;
    entity.descripcion= dto.descripcion;
    entity.material_cuadro= dto.material_cuadro;
    entity.componentes=dto.componentes;
    entity.valoracion= dto.valoracion;
    const date = new Date
    entity.fecha_modificacion = date;
    return entity;
  }

  static toEntityImage(dto: CreateProductImage): Imagen {
    if (!dto) {
      return null;
    }
    const entity =  new Imagen();
    entity.producto_id = dto.producto_id;
    entity.imagen = dto.imagen;
    entity.fecha_creacion = new Date();
    entity.fecha_modificacion = new Date();
    return entity;
  }

  static toUpdateEntityImage(dto: CreateProductImage): Imagen {
    if (!dto) {
      return null;
    }
    const entity =  new Imagen();
    entity.producto_id = dto.producto_id;
    entity.imagen = dto.imagen;
    entity.fecha_modificacion = new Date();
    return entity;
  }
}