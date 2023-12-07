import { Product } from "src/controllers/products/entities/product.entity";
import { Usuario } from "src/controllers/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Calificacion'})
export class Calificacion {

    // @PrimaryColumn({name: 'id'})
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name: 'producto_id'})
    producto_id: number;
    @Column({name: 'emisor_id'})
    emisor_id: number;
    @Column({name: 'descripcion'})
    descripcion: string;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: string;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: string;

    @ManyToOne((() => Usuario))
    @JoinColumn({ name: 'emisor_id' })
    user: Usuario ;

    @ManyToOne((() => Product))
    @JoinColumn({ name: 'producto_id' })
    product: Product ;
}
