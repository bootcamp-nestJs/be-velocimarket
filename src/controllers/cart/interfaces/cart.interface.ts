import { addProductCartDto } from "../dto/add-product-cart.dto";
import { CreateCartDto } from "../dto/create-cart.dto";
import { UpdateCartDto } from "../dto/update-cart.dto";

export interface ICart {
  createCart(createCartDto: CreateCartDto);
  addProductToCart(addProduct: addProductCartDto);
  removeProductCart(productId: number, cartId: number);
  findAllCarts():any;
  findCartById(cartId:Number);
  updateCart(id: Number, updateCartDto: UpdateCartDto);  
  removeCart(id: Number);
  checkoutCart(id: number);
}