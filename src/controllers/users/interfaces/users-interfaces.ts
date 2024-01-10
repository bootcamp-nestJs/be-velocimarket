import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { valorateUserDto } from "../dto/valoration.dto";

export interface User {
    id: string;
    nombre: string;
    apellido: string;
    mail: string;
    user: string;
    password: string;
    telefono: string;
    calle: string;
    numero: number;
    comuna: number;
    region: number;
    fechaCreacion: string;
    fechaModificacion?: string;
}

export interface IUsers {
    createUser( newUser: CreateUserDto);
    findAllUsers();
    findUserById(id: number);
    findUserByUserName(user_name: string);
    findUsersByInclude(name: string);
    updateUser(id: number, updateData: UpdateUserDto);
    getUserPassword(id: number);
    removeUser(id: number);
    cambiarValoracion(valoration : valorateUserDto);
    uploadAvatar(id: number, file: Express.Multer.File);

}