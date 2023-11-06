import { Product } from "src/controllers/products/entities/Product.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'Usuario'})
export class Usuario {

    @PrimaryColumn({name: 'id'})
    id: number;
    @Column({name: 'nombre'})
    nombre: string;
    @Column({name: 'user_name'})
    user_name: string;
    @Column({name: 'apellido'})
    apellido: string;
    @Column({name: 'mail'})
    mail: string;
    @Column({name: 'password'})
    password: string;
    @Column({name: 'telefono'})
    telefono: string;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: string;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: string;

    @OneToMany(() => Product, (p) => p.usuario_id)
    product: Product[];
    }

