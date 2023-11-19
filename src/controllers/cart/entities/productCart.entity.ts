import { Product } from "src/controllers/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity({ name: 'CarritoProducto'})
export class CartProduct {
    @PrimaryColumn({name: 'id'})
    id: number;
    @Column({name: 'carrito_id'})
    carrito_id: number;
    @Column({name: 'producto_id'})
    producto_id: number;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: Date;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: Date;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'producto_id'})
    product: Product;

    @ManyToOne(() => Cart)
    @JoinColumn({ name: 'carrito_id'})
    cart: Cart;

}