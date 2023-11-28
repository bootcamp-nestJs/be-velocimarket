import { Product } from "src/controllers/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity({ name: 'CarritoProducto'})
export class CartProduct {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;
    @Column({name: 'carrito_id'})
    carrito_id: number;
    @Column({name: 'producto_id'})
    producto_id: number;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: Date;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: Date;

    @ManyToOne(() => Product, p => p.carritoProducto)
    @JoinColumn({ name: 'producto_id'})
    product: Product;

    @ManyToOne(() => Cart, c => c.cartProduct)
    @JoinColumn({ name: 'carrito_id'})
    cart: Cart;

}