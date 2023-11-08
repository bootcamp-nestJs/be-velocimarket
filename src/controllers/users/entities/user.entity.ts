import { Product } from "src/controllers/products/entities/Product.entity";
import { Reclamos } from "src/controllers/reports/entities/Reclamos.entity";
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Direccion } from "./direccion.entity";
import { Mensaje } from "src/controllers/mensajes/entities/mensaje.entity";

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

    @OneToMany(() => Product, (p) => p.usuario)
    producto: Product[];

    @OneToMany(() => Reclamos, (r) => r.user)
    reclamo: Reclamos[];

    @OneToOne(() => Direccion, d => d.user)
    direccion: Direccion;

    // @ManyToMany(() => Mensaje, m=> m.user)
    // msg: Mensaje[];
    }
    

