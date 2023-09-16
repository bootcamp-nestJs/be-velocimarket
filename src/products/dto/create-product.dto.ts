import { IsDateString, IsInt, IsOptional, IsPositive, IsString, IsUUID, MaxLength, Min, MinLength, isDate, isDateString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { version } from "os";

export class CreateProductDto {
    @ApiProperty({
        type: 'string',
        example: 'Marco de bicicleta',
        minimum: 3,
        required: true,
        description: "Nombre del producto",
        title: "Nombre"
    })
    @IsString({message: "El atributo nombre presenta error,revise que es string"})
    @MinLength(3,{message: "El atributo brand presenta error, necesita minimo 3 caracteres"})
    @MaxLength(20,{message: "El atributo brand presenta error, necesita como maximo 20 caracteres"})
    readonly nombre:string;

    @ApiProperty({
        type: 'string',
        example: 'Cadenas',
        minimum: 3,
        required: true,
        description: "Categoría del producto",
        title: "Categoría"
    })
    @IsString({message: "El atributo categoría presenta error, revise que es string"})
    @MinLength(3,{message: "El atributo categoría presenta error, necesita minimo 3 caracteres"})
    @MaxLength(15,{message: "El atributo categoría presenta error, necesita como maximo 15 caracteres"})
    readonly categoria:string;

    @ApiProperty({
        type: 'string',
        example: 'Asiento para bicicleta marca XXXX',
        minimum: 3,
        required: true,
        description: "Descripción del producto",
        title: "Descripción"
    })
    @IsString({message: "El atributo descripcion presenta error, revise que es string"})
    @MinLength(3,{message: "El atributo descripcion presenta error, necesita minimo 3 caracteres"})
    @MaxLength(200,{message: "El atributo descripcion presenta error, necesita como maximo 200 caracteres"})
    readonly descripcion:string;

    @ApiProperty({
        type: 'string',
        example: 'Trek',
        minimum: 3,
        required: true,
        description: "Marca del producto",
        title: "Marca"
    })
    @IsString({message: "El atributo marca presenta error, revise que es string"})
    @MinLength(3,{message: "El atributo marca presenta error, necesita minimo 3 caracteres"})
    @MaxLength(15,{message: "El atributo marca presenta error, necesita como maximo 15 caracteres"})
    readonly marca:string;

    @ApiProperty({
        type: 'string',
        example: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fla.network%2Fprimera-bicicleta-antirrobo-lanza-nuevos-modelos%2F&psig=AOvVaw3keQlHPLfqhpka-SI-nwn6&ust=1694829917516000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNiBtMvDq4EDFQAAAAAdAAAAABAE',
        minimum: 3,
        required: true,
        description: "url de imágen del producto",
        title: "Imágen"
    })
    @IsString({message: "El atributo imagen presenta error, revise que es string/url"})
    @MinLength(3,{message: "El atributo imagen presenta error, necesita minimo 3 caracteres"})
    // @MaxLength(100,{message: "El atributo imagen presenta error, necesita como maximo 100 caracteres"})
    readonly imagen:string;

   /* @ApiProperty({
        type: 'string',
        example: '123213123',
        minimum: 3,
        required: false,
        description: "ID del producto",
        title: "ID"
    })
    @IsString({message: "El atributo id presenta error, revise que es string"})
    @MinLength(3,{message: "El atributo id presenta error, necesita minimo 3 caracteres"})
    @MaxLength(100,{message: "El atributo id presenta error, necesita como maximo 100 caracteres"})
    @IsOptional()
    readonly id?:string;

    @ApiProperty({
        type: 'string',
        example: 'Fri Sep 15 2023 09:57:14 GMT-0300 (hora de verano de Chile)',
        minimum: 3,
        required: true,
        description: "Fecha de creación del producto",
        title: "Fecha de creación"
    })
    // @IsDateString()
    @MinLength(3,{message: "El atributo fechaCreacion presenta error, necesita minimo 3 caracteres"})
    @MaxLength(100,{message: "El atributo fechaCreacion presenta error, necesita como maximo 100 caracteres"})
    @IsOptional()
    readonly fechaCreacion?:string;

    @ApiProperty({
        type: 'string',
        example: 'Fri Sep 15 2023 09:57:14 GMT-0300 (hora de verano de Chile)',
        minimum: 3,
        required: false,
        description: "Fecha de creación del producto",
        title: "Fecha de modificación"
    })
    //@IsDateString()
    @MinLength(3,{message: "El atributo fechaModificacion presenta error, necesita minimo 3 caracteres"})
    @MaxLength(100,{message: "El atributo fechaModificacion presenta error, necesita como maximo 100 caracteres"})
    @IsOptional()
    readonly fechaModificacion?:string;
    */
    @ApiProperty({
        type: 'number',
        example: 20000,
        minimum: 0,
        required: true,
        description: "Precio del producto",
        title: "Precio"
    })
    @IsInt({ message: "El atributo precio presenta error, revise que es numerico" })
    @IsPositive({ message: "El atributo precio presenta error, debe ser mayor a cero" })
    readonly precio: number;
}

    
  