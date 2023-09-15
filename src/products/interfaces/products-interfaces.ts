import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

export interface Products {
    nombre : string;
    categoria : string;
    descripcion? : string;
    id? : string;
    precio : number;
    fechaCreacion?: string;
    fechaModificacion?: string;
    marca: string;
    imagen: string;
}

export interface IProducts {
    findAllProducts():any;
    findProduct(carId:string);
    updateProduct(id: string, updateProductDto: UpdateProductDto);  
    removeProduct(id: string);  
    crearProducto(crearProductoDto: CreateProductDto);
    llenarListaConSeedData(productos:Products[]);
    findProductByInclude(nombre: string): any;
}