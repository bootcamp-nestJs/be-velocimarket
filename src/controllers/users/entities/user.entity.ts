import { Product } from "src/controllers/products/entities/product.entity";
import { Reclamos } from "src/controllers/reports/entities/Reclamos.entity";
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Mensaje } from "src/controllers/mensajes/entities/mensaje.entity";
import { Follower } from "./follower.entity";
import { Following } from "./following.entity";
import { Calificacion } from "src/controllers/reports/entities/calificacion.entity";
import { Cart } from "src/controllers/cart/entities/cart.entity";
import { Conversacion } from "src/controllers/mensajes/entities/conversacion.entity";

@Entity({ name: 'Usuario'})
export class Usuario {

    // @PrimaryColumn({name: 'id'})
    @PrimaryGeneratedColumn()
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
    @Column({name: 'calle'})
    calle: string;
    @Column({name: 'numero'})
    numero: number;
    @Column({name: 'comuna'})
    comuna: number;
    @Column({name: 'region'})
    region: number;
    @Column({name: 'valoracion'})
    valoracion: number;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: Date;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: Date;

    @OneToMany(() => Product, (p) => p.usuario)
    producto: Product[];

    @OneToMany(() => Reclamos, (r) => r.user)
    reclamo: Reclamos[];

    @OneToMany(() => Conversacion, c => c.user)
    conversaciones: Conversacion[];

    @OneToMany(() => Follower, f => f.user)
    follower: Follower[];

    @OneToMany(() => Following, f => f.user)
    following: Following[];

    @OneToMany(() => Calificacion, (c) => c.user)
    calificacion: Calificacion[];

    @OneToMany(() => Cart, (c) => c.user)
    carrito: Cart[];
    }
    

