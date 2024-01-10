import { Usuario } from "src/controllers/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subcategoria } from "./subcategoria.entity";
import { Imagen } from "./imagen.entity";
import { Calificacion } from "src/controllers/reports/entities/calificacion.entity";
import { Reclamos } from "src/controllers/reports/entities/reclamos.entity";
import { CartProduct } from "src/controllers/cart/entities/productCart.entity";
import { Conversacion } from "src/controllers/mensajes/entities/conversacion.entity";

@Entity({ name: 'Producto'})
export class Product {
    
    @PrimaryGeneratedColumn()
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
    @Column({name: 'tamanio'})
    tamanio: string;
    @Column({name: 'estado'})
    estado: string;
    @Column({name: 'material_cuadro'})
    material_cuadro: string;
    @Column({name: 'componentes'})
    componentes: string;
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
    
    @OneToMany(() => Conversacion, (c) => c.product)
    conversaciones: Conversacion[];
    
    @OneToMany(() => CartProduct, c=> c.product)
    carritoProducto: CartProduct[];
    
    @OneToMany(() => Reclamos, (r) => r.product)
    reclamos: Reclamos[];
    
    @ManyToOne(() => Subcategoria)
    @JoinColumn({ name: 'categoria_id' })
    subcat: Subcategoria;
    
    @OneToMany(() => Imagen, (i) => i.product)
    img: Imagen[];
    
}
