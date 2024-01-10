import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./user.entity";

@Entity({ name: 'Following'})
export class Following {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({name: 'usuario_id'})
    usuario_id: number;
    @Column({name: 'following_id'})
    following_id: number;
    @Column({name: 'fecha_creacion'})
    fecha_creacion: string;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    @JoinColumn({ name: 'following_id' })
    user: Usuario ;
    }
    

