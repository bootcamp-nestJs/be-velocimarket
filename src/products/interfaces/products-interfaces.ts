import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

export interface Products {
    id? : string;
    nombre : string;
    categoria : string;
    descripcion? : string;
    precio : number;
    marca: string;
    imagen: string;
    tamaño: string;
    estado: string;
    material_cuadro: string;
    compontes: string;
    fechaModificacion?: string;
    fechaCreacion?: string;
}

export interface IProducts {
    createProduct(crearProductoDto: CreateProductDto);
    findAllProducts():any;
    findProductById(carId:string);
    findProductByInclude(nombre: string): any;
    updateProduct(id: string, updateProductDto: UpdateProductDto);  
    removeProduct(id: string);  
    fillProductWithSeed(productos:Products[]);
}