import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity";
import { Categoria } from "./Categoria.entity";

@Entity({ name: 'Subcategoria'})
export class Subcategoria {
    @PrimaryColumn({name: 'id'})
    id: number;
    @Column({name: 'categoria_id'})
    categoria_id: number;
    @Column({name: 'descripcion'})
    descripcion: string;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: string;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: string;

    // @OneToMany(() => Product, (p) => p.categoria_id)
    // producto: Product[];

    // @ManyToOne((() => Categoria))
    // @JoinColumn({ name: 'categoria_id' })
    // categoria: Categoria ;
   
}