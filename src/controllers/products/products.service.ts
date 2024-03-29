import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProducts } from './interfaces/products-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Imagen } from './entities/imagen.entity';
import { ProductMapper } from './mapper/mapper.products';
import { ProductDto } from './dto/product.dto';
import { CreateProductImage } from './dto/create-image.dto';
import { Categoria } from './entities/categoria.entity';
import { UploadImageService } from 'src/services/upload-image.service';

const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("velocimarket");
@Injectable()
export class ProductsService implements IProducts {
  constructor(
    private uploadImageService: UploadImageService,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Imagen)
    private imagenRepository: Repository<Imagen>,
    @InjectRepository(Categoria)
    private catRepository: Repository<Categoria>
  ) { }

  async createProduct(newProduct: CreateProductDto): Promise<ProductDto> {
    try {
      const newProductDto = ProductMapper.toEntity(newProduct);
      const newProductCreated = await this.productRepository.save(newProductDto);

      return this.findProductById(newProductCreated.id);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findAllProducts(pag: number): Promise<ProductDto[]> {
    try {
      const listProducts = await this.productRepository.find({
        relations: {
          img: true,
          subcat: {
          }
        },
        skip: 6 * (pag - 1),
        take: 6,
        where: {
          vendido: false
        },
      });
      return ProductMapper.toDtoList(listProducts);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findProductById(Id: number): Promise<ProductDto> {
    const product = await this.productRepository.findOne({

      relations: {
        subcat: true,
        img: true,
        usuario: true
      },
      where: {
        id: Id
      }
    });
    const product_dto = ProductMapper.toDto(product);
    if (!product_dto) {
      throw new NotFoundException(`el producto del usuario ${Id} no se encontro!`);
    }
    return product_dto;
  }

  async findProductByUserId(userId: number, pag: number): Promise<ProductDto[]> {
    const product = await this.productRepository.find({

      relations: {
        subcat: true,
        img: true,
        usuario: true
      },
      where: {
        usuario: {
          id: userId
        }
      },
      skip: 6 * (pag - 1),
      take: 6
    });

    const product_dto = ProductMapper.toDtoList(product);

    if (!product_dto || product_dto.length == 0) {
      throw new NotFoundException(`El usuario ${userId} no tiene productos aún!`);
    }

    return product_dto;
  }

  async findProductByInclude(name: string, pag: number): Promise<ProductDto[]> {
    const listProducts = await this.productRepository.find({
      where: {
        nombre: Like(`%${name}%`),
      },
      relations: {
        subcat: true,
        img: true
      },
      skip: 6 * (pag - 1),
      take: 6
    });

    const productsInclude = ProductMapper.toDtoList(listProducts);

    if (!productsInclude || productsInclude.length === 0) throw new NotFoundException(`No se encontraron coincidencias con el nombre: ${name}`);

    return productsInclude;
  }

  async findProductByFilter(name: string, categoria: number, subcat: number, pag: number, fecha: number, precio: number): Promise<any[]> {

    if (name != null && categoria == null && subcat == null) {
      const listProducts = await this.productRepository.find({
        where: {
          nombre: Like(`%${name}%`),
          vendido: false
        },
        relations: {
          subcat: true,
          img: true
        },
        skip: 6 * (pag - 1),
        take: 6,
        order: {
          fecha_creacion: fecha == 1 ? "DESC" : "ASC",
          precio: precio == 1 ? "DESC" : "ASC"
        }
      });
      const productsInclude = ProductMapper.toDtoList(listProducts);
      if (!productsInclude || productsInclude.length === 0) throw new NotFoundException(`No se encontraron coincidencias con el nombre: ${name}`);
      return productsInclude;
    }

    else if (name == null && categoria != null && subcat == null) {

      const listSubcaProducts = await this.productRepository.find({
        relations: ["subcat", "subcat.categ", "usuario", "img"],
        where: {
          subcat: {
            categ: {
              id: categoria
            }
          },
          vendido: false
        },
        skip: 6 * (pag - 1),
        take: 6,
        order: {
          fecha_creacion: fecha == 1 ? "DESC" : "ASC",
          precio: precio == 1 ? "DESC" : "ASC"
        }
      });
      return ProductMapper.toDtoList(listSubcaProducts);
    }
    else if (name == null && categoria == null && subcat != null) {
      const listSubcaProducts = await this.productRepository.find({
        relations: ["subcat", "subcat.categ", "usuario", "img"],
        where: {
          id: subcat,
          vendido: false
        },
        skip: 6 * (pag - 1),
        take: 6,
        order: {
          fecha_creacion: fecha == 1 ? "DESC" : "ASC",
          precio: precio == 1 ? "DESC" : "ASC"
        }
      });
      return ProductMapper.toDtoList(listSubcaProducts);
    }
    else if (name != null && categoria != null && subcat == null) {
      const listSubcaProducts = await this.productRepository.find({
        relations: ["subcat", "subcat.categ", "usuario", "img"],
        where: {
          subcat: {
            categ: {
              id: categoria
            }
          },
          nombre: Like(`%${name}%`),
          vendido: false
        },
        skip: 6 * (pag - 1),
        take: 6,
        order: {
          fecha_creacion: fecha == 1 ? "DESC" : "ASC",
          precio: precio == 1 ? "DESC" : "ASC"
        }
      });
      return ProductMapper.toDtoList(listSubcaProducts);
    }
    else if (name != null && categoria == null && subcat != null) {
      const listSubcaProducts = await this.productRepository.find({
        relations: ["subcat", "subcat.categ", "usuario", "img"],
        where: {
          subcat: {
            id: subcat
          },
          nombre: Like(`%${name}%`),
          vendido: false
        },
        skip: 6 * (pag - 1),
        take: 6,
        order: {
          fecha_creacion: fecha == 1 ? "DESC" : "ASC",
          precio: precio == 1 ? "DESC" : "ASC"
        }
      });
      return ProductMapper.toDtoList(listSubcaProducts);
    }
    else if (name == null && categoria != null && subcat != null) {
      const listSubcaProducts = await this.productRepository.find({
        relations: ["subcat", "subcat.categ", "usuario", "img"],
        where: {
          subcat: {
            id: subcat,
            categ: {
              id: categoria
            }
          },
          vendido: false,
        },
        skip: 6 * (pag - 1),
        take: 6,
        order: {
          fecha_creacion: fecha == 1 ? "DESC" : "ASC",
          precio: precio == 1 ? "DESC" : "ASC"
        }
      });
      return ProductMapper.toDtoList(listSubcaProducts);
    }
    else if (name != null && categoria != null && subcat != null) {
      const listSubcaProducts = await this.productRepository.find({
        relations: ["subcat", "subcat.categ", "usuario", "img"],
        where: {
          subcat: {
            id: subcat,
            categ: {
              id: categoria
            }
          },
          nombre: Like(`%${name}%`),
          vendido: false
        },
        skip: 6 * (pag - 1),
        take: 6,
        order: {
          fecha_creacion: fecha == 1 ? "DESC" : "ASC",
          precio: precio == 1 ? "DESC" : "ASC"
        }
      });
      return ProductMapper.toDtoList(listSubcaProducts);
    }
  };

  async updateProduct(id: number, updateData: UpdateProductDto): Promise<string> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException(`El producto ${id} que esta tratando de actualizar no existe`);

    const newProduct: Product = ProductMapper.toUpdateEntity(id, updateData)

    await this.productRepository.update(id, newProduct)

    return `Producto id: ${id} actualizado con éxito`;
  }

  async removeProduct(id: number): Promise<string> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException(`El producto que esta tratando de eliminar no existe ${id}`);

    await this.productRepository.delete(id)

    return `Producto id: ${id} eliminado con exito`;
  }

  async findProductBySell(id: number): Promise<ProductDto[]> {
    const products = await this.productRepository.find({
      where: {
        usuario_id: id,
        vendido: true
      },
      relations: {
        subcat: true,
        img: true,
        usuario: true
      }
    });
    const products_dto = ProductMapper.toDtoList(products);
    if (products_dto.length == 0) {
      throw new NotFoundException(`el usuario no tiene productos vendidos aún!`);
    }
    return products_dto;
  }

  async saveProductImage(userId: number, productId: number, file: Express.Multer.File): Promise<void> {
    try {
      const publicUrl = await this.uploadImageService.upload(userId, file);

      const newImage: CreateProductImage = {
        producto_id: Number(productId),
        imagen: publicUrl
      }

      const newImageDto = ProductMapper.toUpdateEntityImage(newImage);
      await this.imagenRepository.save(newImageDto);

      return;
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async getProductImages(userId: number, productId: number): Promise<string[]> {
    let productImages: string[] = [];

    const product = await this.productRepository.find({
      where: {
        id: productId,
        usuario_id: userId
      },
      relations: {
        img: true,
      }
    });

    if (!product) throw new NotFoundException('El producto no existe');

    const images = product[0].img;
    if (images.length === 0) return [];

    try {
      images.forEach(img => {
        const imagePath = img.imagen;

        productImages.push(imagePath);
      });

      return productImages;

    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async removeProductImage(id: number): Promise<string> {
    const image = await this.imagenRepository.findOneBy({ id })

    if (!image) throw new NotFoundException(`La imagen id ${id} no existe`);

    const [, fileName] = image.imagen.split('velocimarket/');

    try {
      await bucket.file(fileName).delete();

      await this.imagenRepository.delete(id);

      return `Imagen id: ${id} eliminada con exito`
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }


  async getProductsCategories() {
    const findedCategories = await this.catRepository.find({
      relations: {
        subcategoria: true
      },
    }
    );

    const categories = ProductMapper.toCatDtoList(findedCategories);

    return categories;
  }
}
