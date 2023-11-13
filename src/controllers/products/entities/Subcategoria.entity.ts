import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Product } from "./Product.entity";
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

    @ManyToOne((() => Categoria))
    @JoinColumn({ name: 'categoria_id' })
    categ: Categoria ;

    @OneToMany(() => Product, (p) => p.subcat)
    product: Product[];
   
}