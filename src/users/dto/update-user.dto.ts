import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsAlphanumeric, IsEmail, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsPositive, IsString, MaxLength, MinLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        type: 'string',
        example: 'Alfonso',
        minimum: 3,
        required: true,
        description: "Nombre del usuario",
        title: "Nombre"
    })
    @IsOptional()
    @IsString({message: "El atributo nombre presenta error,revise que es string"})
    @MinLength(3,{message: "El atributo nombre presenta error, necesita minimo 3 caracteres"})
    @MaxLength(20,{message: "El atributo nombre presenta error, necesita como maximo 20 caracteres"})
    @IsNotEmpty({message: "El atributo nombre presenta error, no puede ser un campo vacío"})
    readonly nombre?: string;

    @ApiProperty({
        type: 'string',
        example: 'Contreras',
        minimum: 3,
        required: true,
        description: "Apellido del usuario",
        title: "Apellido"
    })
    @IsOptional()
    @IsString({message: "El atributo apellido presenta error,revise que es string"})
    @MinLength(3,{message: "El atributo apellido presenta error, necesita minimo 3 caracteres"})
    @MaxLength(20,{message: "El atributo apellido presenta error, necesita como maximo 20 caracteres"})
    @IsNotEmpty({message: "El atributo apellido presenta error, no puede ser un campo vacío"})
    readonly apellido?: string;

    @ApiProperty({
        type: 'string',
        example: 'alfonso.contreras@usach.cl',
        minimum: 3,
        required: true,
        description: "Correo electrónico",
        title: "Email"
    })
    @IsOptional()
    @IsString({message: "El atributo mail presenta error,revise que es string"})
    @MinLength(3,{message: "El atributo mail presenta error, necesita minimo 3 caracteres"})
    @MaxLength(50,{message: "El atributo mail presenta error, necesita como maximo 50 caracteres"})
    @IsEmail()
    @IsNotEmpty({message: "El atributo mail presenta error, no puede ser un campo vacío"})
    readonly mail?: string;

    @ApiProperty({
        type: 'string',
        example: 'AlfonsoCS',
        minimum: 3,
        required: true,
        description: "Nombre de usuario",
        title: "Nombre de usuario"
    })
    @IsOptional()
    @IsString({message: "El atributo user presenta error,revise que es string"})
    @MinLength(3,{message: "El atributo user presenta error, necesita minimo 3 caracteres"})
    @MaxLength(20,{message: "El atributo user presenta error, necesita como maximo 20 caracteres"})
    @IsNotEmpty({message: "El atributo user presenta error, no puede ser un campo vacío"})
    readonly user?: string;

    @ApiProperty({
        type: 'string',
        example: '123456acs',
        minimum: 8,
        required: true,
        description: "Contraseña, mínimo 8 caracteres alfanuméricos",
        title: "Contraseña"
    })
    @IsOptional()
    @IsString({message: "El atributo password presenta error,revise que es string"})
    @MinLength(8,{message: "El atributo password presenta error, necesita mínimo 8 caracteres"})
    @MaxLength(20,{message: "El atributo password presenta error, necesita como máximo 20 caracteres"})
    @IsNotEmpty({message: "El atributo password presenta error, no puede ser un campo vacío"})
    @IsAlphanumeric('en-US', {message: "El atributo password presenta error, debe ser alfanumérico, sin la letra ñ"})
    readonly password?: string;

    @ApiProperty({
        type: 'number',
        example: '972085027',
        minimum: 9,
        required: true,
        description: "Número de teléfono del usuario",
        title: "Teléfono"
    })
    @IsOptional()
    //@IsNumber()
    @IsNotEmpty({message: "El atributo telefono presenta error, no puede ser un campo vacío"})
    //@IsPositive()
    //@IsInt()
    @IsPhoneNumber('CL', {message: "Debe ser un número telefónico de Chile con 8 números"})
    readonly telefono?: string; 
}
