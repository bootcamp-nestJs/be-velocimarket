import { CreateCartDto } from "../dto/create-cart.dto";
import { UpdateCartDto } from "../dto/update-cart.dto";

export interface Cart {
  id?: string;
  valorEnvio: number;
	totalCarrito: number
	medioPago: string;
}

export interface ICart {
  createCart(createCartDto: CreateCartDto);
  findAllCarts():any;
  findCartById(cartId:string);
  updateCart(id: string, updateCartDto: UpdateCartDto);  
  removeCart(id: string);
}