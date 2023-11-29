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