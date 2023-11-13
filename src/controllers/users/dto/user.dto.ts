import { Direccion } from "../entities/direccion.entity";

export class UserDto {
    id: number;
    nombre: string;
    apellido: string;
    user_name: string;
    mail: string;
    telefono: string;
    direccion: Direccion;
}
