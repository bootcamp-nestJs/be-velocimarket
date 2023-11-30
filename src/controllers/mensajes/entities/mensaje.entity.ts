import { Product } from "src/controllers/products/entities/product.entity";
import { Usuario } from "src/controllers/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Conversacion } from "./conversacion.entity";

@Entity({ name: 'Mensaje'})
export class Mensaje {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number;
    @Column({name: 'mensaje'})
    mensaje: string;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: Date;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: Date;
    @Column({name: 'conversacion_id'})
    conversacion_id: number;
    
    @ManyToOne(() => Conversacion)
    @JoinColumn({ name: 'conversacion_id'})
    conversacion: Conversacion;

    }