import { IsAlphanumeric, IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        type: 'string',
        example: 'Alfonso',
        minimum: 3,
        required: true,
        description: "Nombre del usuario",
        title: "Nombre"
    })
    @IsString({message: "El atributo nombre presenta error,revise que es string"})
    @MinLength(3,{message: "El atributo nombre presenta error, necesita minimo 3 caracteres"})
    @MaxLength(20,{message: "El atributo nombre presenta error, necesita como maximo 20 caracteres"})
    @IsNotEmpty({message: "El atributo nombre presenta error, no puede ser un campo vacío"})
    readonly nombre: string;

    @ApiProperty({
        type: 'string',
        example: 'Contreras',
        minimum: 3,
        required: true,
        description: "Apellido del usuario",
        title: "Apellido"
    })
    @IsString({message: "El atributo apellido presenta error,revise que es string"})
    @MinLength(3,{message: "El atributo apellido presenta error, necesita minimo 3 caracteres"})
    @MaxLength(20,{message: "El atributo apellido presenta error, necesita como maximo 20 caracteres"})
    @IsNotEmpty({message: "El atributo apellido presenta error, no puede ser un campo vacío"})
    readonly apellido: string;

    @ApiProperty({
        type: 'string',
        example: 'alfonso.contreras@usach.cl',
        minimum: 3,
        required: true,
        description: "Correo electrónico",
        title: "Email"
    })
    @IsString({message: "El atributo mail presenta error,revise que es string"})
    @MinLength(10,{message: "El atributo mail presenta error, necesita minimo 10 caracteres"})
    @MaxLength(50,{message: "El atributo mail presenta error, necesita como maximo 50 caracteres"})
    @IsEmail({},{message: "El formato mail no es válido"})
    @IsNotEmpty({message: "El atributo mail presenta error, no puede ser un campo vacío"})
    readonly mail: string;

    @ApiProperty({
        type: 'string',
        example: 'AlfonsoCS',
        minimum: 3,
        required: true,
        description: "Nombre de usuario",
        title: "Nombre de usuario"
    })
    @IsString({message: "El atributo user presenta error,revise que es string"})
    @MinLength(3,{message: "El atributo user presenta error, necesita minimo 3 caracteres"})
    @MaxLength(20,{message: "El atributo user presenta error, necesita como maximo 20 caracteres"})
    @IsNotEmpty({message: "El atributo user presenta error, no puede ser un campo vacío"})
    readonly user: string;

    @ApiProperty({
        type: 'string',
        example: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dmsn%2BMessenger&psig=AOvVaw0GTdHgzu-SENoLaqQboVIo&ust=1704596499279000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJidrP_ix4MDFQAAAAAdAAAAABAD',
        required: false,
        description: "Avatar de usuario",
        title: "Avatar de usuario"
    })
    @IsString({message: "El atributo user presenta error,revise que es string"})
    readonly user_avatar: string;

    @ApiProperty({
        type: 'string',
        example: '123456acs',
        minimum: 8,
        required: true,
        description: "Contraseña, caracteres alfanuméricos",
        title: "Contraseña"
    })
    
    @MinLength(8,{message: "El atributo password presenta error, necesita mínimo 8 caracteres"})
    @IsNotEmpty({message: "El atributo password presenta error, no puede ser un campo vacío"})
    @IsAlphanumeric('en-US', {message: "El atributo password presenta error, debe ser alfanumérico, sin la letra ñ"})
    readonly password: string;

    @ApiProperty({
        type: 'string',
        example: '972085027',
        minimum: 9,
        required: true,
        description: "Número de teléfono del usuario",
        title: "Teléfono"
    })
    // dejamos solo IsPhoneNumber que resume todas las validaciones anteriores
    @IsPhoneNumber('CL', {message: "Debe ser un número telefónico de Chile con 8 números"})
    @IsNotEmpty({message: "El atributo teléfono presenta error, no puede ser un campo vacío"})
    readonly telefono: string; 


    @ApiProperty({
        type: 'string',
        example: 'Avenida Siempreviva',
        minimum: 10,
        required: true,
        description: "Calle domicilio usuario",
        title: "Calle"
    })
    @IsString({message: "El atributo calle presenta error,revise que es string"})
    @MinLength(10,{message: "El atributo calle presenta error, necesita minimo 10 caracteres"})
    @MaxLength(20,{message: "El atributo calle presenta error, necesita como maximo 20 caracteres"})
    @IsNotEmpty({message: "El atributo calle presenta error, no puede ser un campo vacío"})
    readonly calle: string;

    @ApiProperty({
        type: 'number',
        example: 742,
        minimum: 1,
        required: true,
        description: "Número de la calle domicilio usuario",
        title: "Numeración"
    })
    @IsInt({message: "El atributo número debe ser un entero positivo"})
    @IsNotEmpty({message: "El atributo número presenta error, no puede ser un campo vacío"})
    readonly numero: number;

    @ApiProperty({
        type: 'number',
        example: 3,
        minimum: 2,
        required: true,
        description: "Ciudad domicilio usuario",
        title: "Comuna"
    })
    @IsInt({message: "El atributo comuna debe ser un entero positivo"})
    @IsNotEmpty({message: "El atributo comuna presenta error, no puede ser un campo vacío"})
    readonly comuna: number;

    @ApiProperty({
        type: 'number',
        example: 1,
        minimum: 2,
        required: true,
        description: "Región domicilio usuario",
        title: "Región"
    })
    @IsInt({message: "El atributo región debe ser un entero positivo"})
    @IsNotEmpty({message: "El atributo región presenta error, no puede ser un campo vacío"})
    readonly region: number;
}
