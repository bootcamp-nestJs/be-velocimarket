import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Usuario } from "./user.entity";


@Entity({ name: 'Follower'})
export class Follower {

    @PrimaryColumn({name: 'id'})
    id: number;
    @Column({name: 'usuario_id'})
    usuario_id: number;
    @Column({name: 'follower_id'})
    follower_id: number;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: string;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    @JoinColumn({ name: 'follower_id' })
    user: Usuario ;
    }
    

