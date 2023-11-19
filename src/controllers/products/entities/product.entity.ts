import { Usuario } from "src/controllers/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Subcategoria } from "./Subcategoria.entity";
import { Imagen } from "./Imagen.entity";
import { Calificacion } from "src/controllers/reports/entities/calificacion.entity";
import { Mensaje } from "src/controllers/mensajes/entities/mensaje.entity";
import { Cart } from "src/controllers/cart/entities/cart.entity";
import { Reclamos } from "src/controllers/reports/entities/Reclamos.entity";

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
    fecha_creacion: Date;
    @Column({name: 'fecha_modificacion'})
    fecha_modificacion: Date;
    @Column({name: 'vendido'})
    vendido: boolean;

    @ManyToOne((() => Usuario))
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
    
    @OneToMany(() => Calificacion, (c) => c.user)
    calificacion: Calificacion[];
    
    @ManyToMany(() => Mensaje, m=> m.product)
    msg: Mensaje[];
    
    @ManyToMany(() => Cart, c=> c.product)
    carrito: Cart[];
    
    @OneToMany(() => Reclamos, (r) => r.product)
    reclamos: Reclamos[];
    
    @ManyToOne(() => Subcategoria)
    @JoinColumn({ name: 'categoria_id' })
    subcat: Subcategoria ;
    
    @OneToMany(() => Imagen, (i) => i.product)
    img: Imagen[];
    
}
