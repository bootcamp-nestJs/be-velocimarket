import { Imagen } from "../entities/imagen.entity";

export class ProductDto {
    id?: number;
    nombre?: string;
    descripcion?: string;
    precio?: number;
    marca?: string;
    tamanio?: string;
    estado?: string;
    material_cuadro?: string;
    componentes?: string;
    valoracion?: number;
    img?: Imagen[];
    cat?:string;
    user?: string;
    comuna?: string;
    userId?: number;
    vendido?: boolean;
}
