import { IsDateString, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, Min, MinLength, isDate, isDateString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/controllers/products/entities/product.entity";
export class CreateCartDto {
  @ApiProperty({
    type: 'number',
    example: 3500,
    minimum: 3,
    required: true,
    description: "Valor del envío",
    title: "ValorEnvio"
  })
  @IsInt({message: "El atributo valorEnvio presenta error,revise que es numerico"})
  @IsPositive({ message: "El atributo valorEnvio presenta error, debe ser mayor a cero" })
  readonly valorEnvio: number;

  @ApiProperty({
    type: 'number',
    example: 1,
    minimum: 1,
    required: true,
    description: "Id del producto",
    title: "productoId"
  })
  @IsInt({message: "El atributo productoId presenta error,revise que es numerico"})
  @IsPositive({ message: "El atributo productoId presenta error, debe ser mayor a cero" })
	readonly productoId: number

  @ApiProperty({
    type: 'string',
    example: 'OnePay',
    minimum: 10,
    required: true,
    description: "Medio de pago",
    title: "medioPago"
  })
  @IsString({message: "El atributo medioPago presenta error,revise que es string"})
  @MinLength(3,{message: "El atributo medioPago presenta error, necesita minimo 3 caracteres"})
  @MaxLength(20,{message: "El atributo medioPago presenta error, necesita como maximo 20 caracteres"})
	readonly medioPago: string;

}
