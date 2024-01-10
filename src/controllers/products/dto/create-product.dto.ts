import { IsInt, IsNotEmpty, IsPositive, IsString, Max, MaxLength, MinLength} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
    @MinLength(3,{message: "El atributo nombre presenta error, necesita minimo 3 caracteres"})
    @MaxLength(100,{message: "El atributo nombre presenta error, necesita como maximo 20 caracteres"})
    @IsNotEmpty({message: "El atributo nombre presenta error, no puede ser un campo vacío"})
    readonly nombre:string;

    @ApiProperty({
        type: 'number',
        example: 1,
        minimum: 3,
        required: true,
        description: "Categoría del producto",
        title: "Categoría"
    })
    @IsInt({ message: "El atributo precio presenta error, revise que es numerico" })
    @IsPositive({ message: "El atributo precio presenta error, debe ser mayor a cero" })
    @IsNotEmpty({message: "El atributo precio presenta error, no puede ser un campo vacío"})
    @Max(26)
    readonly categoria: number;

    @ApiProperty({
        type: 'string',
        example: 'Asiento para bicicleta marca XXXX',
        minimum: 5,
        required: true,
        description: "Descripción del producto",
        title: "Descripción"
    })
    @IsString({message: "El atributo descripcion presenta error, revise que es string"})
    @MinLength(5,{message: "El atributo descripcion presenta error, necesita minimo 50 caracteres"})
    @MaxLength(200,{message: "El atributo descripcion presenta error, necesita como maximo 200 caracteres"})
    @IsNotEmpty({message: "El atributo descripción presenta error, no puede ser un campo vacío"})
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
    @MaxLength(20,{message: "El atributo marca presenta error, necesita como maximo 15 caracteres"})
    @IsNotEmpty({message: "El atributo marca presenta error, no puede ser un campo vacío"})
    readonly marca:string;

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
    @IsNotEmpty({message: "El atributo precio presenta error, no puede ser un campo vacío"})
    readonly precio: number;

    @ApiProperty({
        type: 'string',
        example: 'XL',
        minimum: 3,
        required: false,
        description: "informacion adicional: tamaño",
        title: "Tamaño"
    })
    @IsString({message: "El atributo tamaño presenta error, revise que es string"})
    @MaxLength(20,{message: "El atributo tamaño presenta error, necesita como maximo 15 caracteres"})
    readonly tamanio:string;

    @ApiProperty({
        type: 'string',
        example: 'usado',
        minimum: 3,
        required: false,
        description: "informacion adicional: estado",
        title: "estado"
    })
    @IsString({message: "El atributo estado presenta error, revise que es string"})
    @MaxLength(20,{message: "El atributo estado presenta error, necesita como maximo 15 caracteres"})
    readonly estado:string;

    @ApiProperty({
        type: 'string',
        example: 'adamantium',
        minimum: 3,
        required: false,
        description: "informacion adicional: material_cuadro",
        title: "material_cuadro"
    })
    @IsString({message: "El atributo material_cuadro presenta error, revise que es string"})
    @MaxLength(20,{message: "El atributo material_cuadro presenta error, necesita como maximo 15 caracteres"})
    readonly material_cuadro:string;

    @ApiProperty({
        type: 'string',
        example: 'cosas',
        minimum: 3,
        required: false,
        description: "informacion adicional: compontes",
        title: "componentes"
    })
    @IsString({message: "El atributo compontes presenta error, revise que es string"})
    @MinLength(3,{message: "El atributo componentes presenta error, necesita minimo 10 caracteres"})
    @MaxLength(200,{message: "El atributo componentes presenta error, necesita como maximo 200 caracteres"})
    readonly componentes:string;

}

    
  