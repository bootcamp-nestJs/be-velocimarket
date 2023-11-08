import { Product } from "src/controllers/products/entities/Product.entity";
import { Reclamos } from "src/controllers/reports/entities/Reclamos.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./user.entity";

@Entity({ name: 'Direccion'})
export class Direccion {

    @PrimaryColumn({name: 'id'})
    id: number;
    @Column({name: 'usuario_id'})
    usuario_id: number;
    @Column({name: 'calle'})
    calle: string;
    @Column({name: 'numero'})
    numero: number;
    @Column({name: 'comuna'})
    comuna: string;
    @Column({name: 'region'})
    region: string;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: string;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: string;

    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id'})
    user: Usuario;
    }

