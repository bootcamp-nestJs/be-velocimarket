import { IsDateString, IsInt, IsOptional, IsPositive, IsString, IsUUID, MaxLength, Min, MinLength, isDate, isDateString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMensajeDto {
  @ApiProperty({
    type: 'string',
    example: 'Hola, mi nombre es russel, y soy un guía explorador.',
    minimum: 5,
    required: true,
    description: "Texto mensaje",
    title: "descripcion"
  })
  @IsString({message: "El atributo descripcion presenta error,revise que es string"})
  @MinLength(5,{message: "El atributo descripcion presenta error, necesita minimo 5 caracteres"})
  @MaxLength(500,{message: "El atributo descripcion presenta error, necesita como maximo 500 caracteres"})
  readonly descripcion: string;
  
  @ApiProperty({
    type: 'number',
    example: '1',
    minimum: 1,
    required: true,
    description: "id usuario",
    title: "id"
  })
  @IsPositive({message: "El atributo idUsuario presenta error,revise que es numerico"})
  @Min(1,{message: "El atributo idUsuario presenta error, necesita ser minimo 1"})
  readonly idUsuario: number;

  @ApiProperty({
    type: 'number',
    example: '1',
    minimum: 1,
    required: true,
    description: "id producto",
    title: "id"
  })
  @IsPositive({message: "El atributo idProducto presenta error,revise que es numerico"})
  @Min(1,{message: "El atributo idProducto presenta error, necesita ser minimo 1"})
  readonly idProducto: number;
}
