import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Subcategoria } from "./subcategoria.entity";

@Entity({ name: 'Categoria'})
export class Categoria {
   
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