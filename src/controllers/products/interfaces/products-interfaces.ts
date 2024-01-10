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
    findProductByUserId(userId: number, pag: number);
    findProductByInclude(nombre: string, pag: number);
    findProductByFilter(name: string, categoria: number, subcat: number, pag: number, fecha: number, precio: number);
    updateProduct(id: number, updateProductDto: UpdateProductDto);  
    removeProduct(id: number);
    findProductBySell(id: number);
    saveProductImage(userId: number, productId: number, file: Express.Multer.File);
    getProductImages(userId: number, productId: number);
    removeProductImage(id: number);
    getProductsCategories();
}