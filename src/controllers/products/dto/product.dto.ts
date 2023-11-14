import { Imagen } from "../entities/Imagen.entity";

export class ProductDto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    marca: string;
    avatar: string;
    tamanio: string;
    estado: string;
    material_cuadro: string;
    componentes: string;
    valoracion: number;
    img: Imagen[];
    cat:string;
}
