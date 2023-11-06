import { Usuario } from "src/controllers/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Subcategoria } from "./Subcategoria.entity";

@Entity({ name: 'Producto'})
export class Product {
    @PrimaryColumn({name: 'id'})
    id: number;
    @Column({name: 'nombre'})
    nombre: string;
    @Column({name: 'categoria_id'})
    categoria_id: number;
    @Column({name: 'usuario_id'})
    usuario_id: number;
    @Column({name: 'descripcion'})
    descripcion: string;
    @Column({name: 'precio'})
    precio: number;
    @Column({name: 'marca'})
    marca: string;
    @Column({name: 'avatar'})
    avatar: string;
    @Column({name: 'tamanio'})
    tamanio: string;
    @Column({name: 'estado'})
    estado: string;
    @Column({name: 'material_cuadro'})
    material_cuadro: string;
    @Column({name: 'componentes'})
    componentes: string;
    @Column({name: 'valoracion'})
    valoracion: number;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: string;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: string;

    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
    @ManyToOne((() => Usuario))

    @ManyToOne((() => Subcategoria))
    @JoinColumn({ name: 'categoria_id' })
    subcategoria: Subcategoria[] ;
   
}
