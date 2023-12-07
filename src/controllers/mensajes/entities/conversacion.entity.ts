import { Product } from "src/controllers/products/entities/product.entity";
import { Usuario } from "src/controllers/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Mensaje } from "./mensaje.entity";

@Entity({ name: 'Conversacion'})
export class Conversacion {

    // @PrimaryColumn({name: 'id'})
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name: 'mensaje_id'})
    mensaje_id: number;
    @Column({name: 'usuario_id'})
    usuario_id: number;
    @Column({name: 'producto_id'})
    producto_id: number;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: Date;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: Date;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id'})
    user: Usuario;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'producto_id'})
    product: Product;
    
    @OneToMany(() => Mensaje, m=> m.conversacion)
    msgs: Mensaje[];
    }