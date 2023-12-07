import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Subcategoria } from "./subcategoria.entity";

@Entity({ name: 'Categoria'})
export class Categoria {
    // @PrimaryColumn({name: 'id'})
    @PrimaryGeneratedColumn()
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