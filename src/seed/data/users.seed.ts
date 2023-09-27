import { Users } from "src/users/interfaces/users-interfaces";
import { v4 as uuid } from 'uuid';

export const user_seed: Users[] =  [
  {
    nombre : "Alfonso",
    apellido : "Contreras",
    mail : "alfonso.contreras@usach.cl",
    id : uuid(),
    user : "AlfonsoCS",
    fechaCreacion: Date().toString(),
    password: "password",
    telefono: "972085027",
  }
];