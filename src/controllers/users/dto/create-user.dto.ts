import { IsAlphanumeric, IsEmail, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsPhoneNumber, IsPositive, IsString, MaxLength, MinLength } from "@nestjs/class-validator";
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
        example: '123456acs',
        minimum: 8,
        required: true,
        description: "Contraseña, mínimo 8 caracteres alfanuméricos",
        title: "Contraseña"
    })
    // si es alfanumerico esta validación esta de más
    // @IsString({message: "El atributo password presenta error,revise que es string"})
    @MinLength(8,{message: "El atributo password presenta error, necesita mínimo 8 caracteres"})
    @MaxLength(20,{message: "El atributo password presenta error, necesita como máximo 12 caracteres"})
    @IsNotEmpty({message: "El atributo password presenta error, no puede ser un campo vacío"})
    @IsAlphanumeric('en-US', {message: "El atributo password presenta error, debe ser alfanumérico, sin la letra ñ"})
    readonly password: string;

    @ApiProperty({
        type: 'number',
        example: '972085027',
        minimum: 9,
        required: true,
        description: "Número de teléfono del usuario",
        title: "Teléfono"
    })
    // dejamos solo IsPhoneNumber que resume todas las validaciones anteriores
    // @IsNumber()
    // @IsPositive({message: "El numero de teléfono debe ser un número positivo"})
    // @IsInt({message: "El numero de teléfono debe ser un numero entero"})
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
    @MinLength(1,{message: "El atributo número presenta error, necesita minimo 1 caracteres"})
    @MaxLength(6,{message: "El atributo número presenta error, necesita como maximo 6 caracteres"})
    @IsNotEmpty({message: "El atributo número presenta error, no puede ser un campo vacío"})
    readonly número: string;

    @ApiProperty({
        type: 'string',
        example: 'Cumpeo',
        minimum: 5,
        required: true,
        description: "Ciudad domicilio usuario",
        title: "Comuna"
    })
    @IsString({message: "El atributo comuna presenta error,revise que es string"})
    @MinLength(5,{message: "El atributo comuna presenta error, necesita minimo 10 caracteres"})
    @MaxLength(20,{message: "El atributo comuna presenta error, necesita como maximo 20 caracteres"})
    @IsNotEmpty({message: "El atributo comuna presenta error, no puede ser un campo vacío"})
    readonly comuna: string;

    @ApiProperty({
        type: 'string',
        example: 'Region de Los Lagos',
        minimum: 10,
        required: true,
        description: "Región domicilio usuario",
        title: "Región"
    })
    @IsString({message: "El atributo región presenta error,revise que es string"})
    @MinLength(10,{message: "El atributo región presenta error, necesita minimo 10 caracteres"})
    @MaxLength(20,{message: "El atributo región presenta error, necesita como maximo 20 caracteres"})
    @IsNotEmpty({message: "El atributo región presenta error, no puede ser un campo vacío"})
    readonly region: string;
}
