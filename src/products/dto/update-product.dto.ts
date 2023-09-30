import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsDateString, IsInt, IsOptional, IsPositive, IsString, IsUUID, MaxLength, Min, MinLength, isDate, isDateString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({
        type: 'string',
        example: 'Marco de bicicleta',
        minimum: 3,
        required: true,
        description: "Nombre del producto",
        title: "Nombre"
    })
    @IsOptional()
    @IsString({message: "El atributo nombre presenta error,revise que es string"})
    @MinLength(3,{message: "El atributo nombre presenta error, necesita minimo 3 caracteres"})
    // @MaxLength(20,{message: "El atributo nombre presenta error, necesita como maximo 20 caracteres"})
    readonly nombre?:string;

    @ApiProperty({
        type: 'string',
        example: 'Cadenas',
        minimum: 3,
        required: true,
        description: "Categoría del producto",
        title: "Categoría"
    })
    @IsOptional()
    @IsString({message: "El atributo categoría presenta error, revise que es string"})
    @MinLength(3,{message: "El atributo categoría presenta error, necesita minimo 3 caracteres"})
    @MaxLength(15,{message: "El atributo categoría presenta error, necesita como maximo 15 caracteres"})
    readonly categoria?:string;

    @ApiProperty({
        type: 'string',
        example: 'Asiento para bicicleta marca XXXX',
        minimum: 3,
        required: true,
        description: "Descripción del producto",
        title: "Descripción"
    })
    @IsOptional()
    @IsString({message: "El atributo descripcion presenta error, revise que es string"})
    @MinLength(3,{message: "El atributo descripcion presenta error, necesita minimo 3 caracteres"})
    @MaxLength(200,{message: "El atributo descripcion presenta error, necesita como maximo 200 caracteres"})
    readonly descripcion?:string;

    @ApiProperty({
        type: 'string',
        example: 'Trek',
        minimum: 3,
        required: true,
        description: "Marca del producto",
        title: "Marca"
    })
    @IsOptional()
    @IsString({message: "El atributo marca presenta error, revise que es string"})
    @MinLength(3,{message: "El atributo marca presenta error, necesita minimo 3 caracteres"})
    @MaxLength(15,{message: "El atributo marca presenta error, necesita como maximo 15 caracteres"})
    readonly marca?:string;

    @ApiProperty({
        type: 'string',
        example: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fla.network%2Fprimera-bicicleta-antirrobo-lanza-nuevos-modelos%2F&psig=AOvVaw3keQlHPLfqhpka-SI-nwn6&ust=1694829917516000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNiBtMvDq4EDFQAAAAAdAAAAABAE',
        minimum: 3,
        required: true,
        description: "url de imágen del producto",
        title: "Imágen"
    })
    @IsOptional()
    @IsString({message: "El atributo imagen presenta error, revise que es string/url"})
    @MinLength(3,{message: "El atributo imagen presenta error, necesita minimo 3 caracteres"})
    // @MaxLength(100,{message: "El atributo imagen presenta error, necesita como maximo 100 caracteres"})
    readonly imagen?:string;
    
    @ApiProperty({
        type: 'number',
        example: 20000,
        minimum: 0,
        required: true,
        description: "Precio del producto",
        title: "Precio"
    })
    @IsOptional()
    @IsInt({ message: "El atributo precio presenta error, revise que es numerico" })
    @IsPositive({ message: "El atributo precio presenta error, debe ser mayor a cero" })
    readonly precio?: number;

    @ApiProperty({
        type: 'string',
        example: 'XL',
        minimum: 3,
        required: true,
        description: "informacion adicional: tamaño",
        title: "Tamaño"
    })
    @IsString({message: "El atributo tamaño presenta error, revise que es string"})
    @MinLength(3,{message: "El atributo tamaño presenta error, necesita minimo 3 caracteres"})
    // @MaxLength(100,{message: "El atributo tamaño presenta error, necesita como maximo 100 caracteres"})
    readonly tamaño:string;

    @ApiProperty({
        type: 'string',
        example: 'usado',
        minimum: 3,
        required: true,
        description: "informacion adicional: estado",
        title: "estado"
    })
    @IsString({message: "El atributo estado presenta error, revise que es string"})
    @MinLength(3,{message: "El atributo estado presenta error, necesita minimo 3 caracteres"})
    // @MaxLength(100,{message: "El atributo estado presenta error, necesita como maximo 100 caracteres"})
    readonly estado:string;

    @ApiProperty({
        type: 'string',
        example: 'adamantium',
        minimum: 3,
        required: true,
        description: "informacion adicional: material_cuadro",
        title: "material_cuadro"
    })
    @IsString({message: "El atributo material_cuadro presenta error, revise que es string"})
    @MinLength(3,{message: "El atributo material_cuadro presenta error, necesita minimo 3 caracteres"})
    // @MaxLength(100,{message: "El atributo material_cuadro presenta error, necesita como maximo 100 caracteres"})
    readonly material_cuadro:string;

    @ApiProperty({
        type: 'string',
        example: 'cosas',
        minimum: 3,
        required: true,
        description: "informacion adicional: compontes",
        title: "compontes"
    })
    @IsString({message: "El atributo compontes presenta error, revise que es string"})
    @MinLength(3,{message: "El atributo compontes presenta error, necesita minimo 3 caracteres"})
    // @MaxLength(100,{message: "El atributo compontes presenta error, necesita como maximo 100 caracteres"})
    readonly compontes:string;
}
