import { Product } from "src/controllers/products/entities/product.entity";
import { Usuario } from "src/controllers/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'Carrito'})
export class Cart {
    @PrimaryColumn({name: 'id'})
    id: number;
    @Column({name: 'usuario_id'})
    usuario_id: number;
    @Column({name: 'valor_envio'})
    valor_envio: number;
    @Column({name: 'total_carrito'})
    total_carrito: number;
    @Column({name: 'medio_pago'})
    medio_pago: string;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: Date;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: Date;

    @ManyToMany(() => Product)
    @JoinTable({ name: 'CarritoProducto'})
    product: Product[];

    @ManyToOne(()=> Usuario)
    @JoinColumn({ name: 'usuario_id'})
    user: Usuario;

}