import { IsDateString, IsInt, IsOptional, IsPositive, IsString, IsUUID, MaxLength, Min, MinLength, isDate, isDateString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMensajeDto {
  @ApiProperty({
    type: 'string',
    example: 'Hola, mi nombre es russel, y soy un guía explorador.',
    minimum: 50,
    required: true,
    description: "Texto mensaje",
    title: "descripcion"
  })
  @IsString({message: "El atributo descripcion presenta error,revise que es string"})
  @MinLength(50,{message: "El atributo descripcion presenta error, necesita minimo 50 caracteres"})
  @MaxLength(500,{message: "El atributo descripcion presenta error, necesita como maximo 500 caracteres"})
  readonly descripcion: string;
}
