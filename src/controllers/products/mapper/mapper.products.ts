import { RegionsCitiesService } from "src/helpers/services/regions-cities.service";
import { CreateProductImage } from "../dto/create-image.dto";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductDto } from "../dto/product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Imagen } from "../entities/imagen.entity";
import { Product } from "../entities/product.entity";
import { Subcategoria } from "../entities/subcategoria.entity";
import { REGIONS } from "src/helpers/constants/regions-cities.constant";

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
    dto.descripcion= entity.descripcion;
    dto.userId = entity.usuario_id;
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
    entity.fecha_modificacion = date;
    entity.vendido = false;
    return entity;
  }  

  static toUpdateEntity(id: number, dto: UpdateProductDto): Product {
    if (!dto) {
      return null;
    }
    const entity =  new Product();
    entity.usuario_id = dto.usuario_id;
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

  static toDtoSubcat(entity: Subcategoria): ProductDto {
    if (!entity) {
      return null;
    }
    entity.product.map(product => {
    const dto =  new ProductDto();
    dto.nombre = product.nombre;
    console.log(product)
    dto.user = product.usuario.nombre;
    dto.precio = product.precio;
    dto.comuna = REGIONS.filter(region => region.id == (product.usuario.region))[0].comunas[product.usuario.comuna];
    dto.img = product.img;
    return dto;
    })
  }
  static toSubcatDtoList(entities: Subcategoria[]): ProductDto[] {
    return entities.map(entity => this.toDtoSubcat(entity));
  }
}

