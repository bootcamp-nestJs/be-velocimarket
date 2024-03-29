import { Usuario } from "src/controllers/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartProduct } from './productCart.entity';

@Entity({ name: 'Carrito'})
export class Cart {
    @PrimaryGeneratedColumn({name: 'id'})
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

    @OneToMany(() => CartProduct, c=> c.cart)
    @JoinTable({ name: 'CarritoProducto'})
    cartProduct: CartProduct[];

    @ManyToOne(()=> Usuario)
    @JoinColumn({ name: 'usuario_id'})
    user: Usuario;

}