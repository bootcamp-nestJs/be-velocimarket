import { Product } from "src/controllers/products/entities/product.entity";
import { Usuario } from "src/controllers/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'Mensaje'})
export class Mensaje {

    @PrimaryColumn({name: 'id'})
    id: number;
    @Column({name: 'producto_id'})
    producto_id: number;
    @Column({name: 'emisor_id'})
    emisor_id: number;
    @Column({name: 'mensaje'})
    mensaje: string;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: Date;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: Date;

    @ManyToMany(() => Usuario)
    @JoinTable({ name: 'Conversacion'})
    user: Usuario[];

    @ManyToMany(() => Product)
    @JoinTable({ name: 'Conversacion'})
    product: Product[];

    }