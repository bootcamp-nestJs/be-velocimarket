import { CreateCartDto } from "../dto/create-cart.dto";
import { UpdateCartDto } from "../dto/update-cart.dto";

export interface ICart {
  createCart(createCartDto: CreateCartDto);
  findAllCarts():any;
  findCartById(cartId:Number);
  updateCart(id: Number, updateCartDto: UpdateCartDto);  
  removeCart(id: Number);
}