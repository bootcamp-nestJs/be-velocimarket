import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

export interface Products {
    id? : number;
    nombre: string;
    categoria: number;
    descripcion?: string;
    precio: number;
    marca: string;
    avatar: string;
    tamanio: string;
    estado: string;
    material_cuadro: string;
    componentes: string;
    fechaModificacion?: Date;
    fechaCreacion?: Date;
}

export interface IProducts {
    createProduct(crearProductoDto: CreateProductDto);
    findAllProducts(pag: number):any;
    findProductById(id:number);
    findProductByInclude(nombre: string): any;
    updateProduct(id: number, updateProductDto: UpdateProductDto);  
    removeProduct(id: number);
}