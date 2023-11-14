import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity";
import { Subcategoria } from "./Subcategoria.entity";

@Entity({ name: 'Categoria'})
export class Categoria {
    @PrimaryColumn({name: 'id'})
    id: number;
    @Column({name: 'categoria'})
    categoria: string;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: string;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: string;

    @OneToMany(() => Subcategoria, (s) => s.categ)
    subcategoria: Subcategoria[];
   
}