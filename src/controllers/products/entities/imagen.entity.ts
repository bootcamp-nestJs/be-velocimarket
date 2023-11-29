import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity({ name: 'Imagen'})
export class Imagen {
    @PrimaryColumn({name: 'id'})
    id: number;
    @Column({name: 'producto_id'})
    producto_id: number;
    @Column({name: 'imagen'})
    imagen: string;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: string;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'producto_id' })
    product: Product ;
   
}