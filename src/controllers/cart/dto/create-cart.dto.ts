import { IsDateString, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, Min, MinLength, isDate, isDateString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
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
  @MinLength(3,{message: "El atributo valorEnvio presenta error, necesita una cifra de minima 3 digitos"})
  readonly valorEnvio: number;

  @ApiProperty({
    type: 'number',
    example: 150000,
    minimum: 3,
    required: true,
    description: "Total Carrito",
    title: "totalCarrito"
  })
  @IsInt({message: "El atributo totalCarrito presenta error,revise que es numerico"})
  @IsPositive({ message: "El atributo totalCarrito presenta error, debe ser mayor a cero" })
  @MinLength(3,{message: "El atributo totalCarrito presenta error, necesita una cifra de minima 3 digitos"})
	readonly totalCarrito: number

  @ApiProperty({
    type: 'string',
    example: 'OnePay',
    minimum: 10,
    required: true,
    description: "Medio de pago",
    title: "medioPago"
  })
  @IsString({message: "El atributo medioPago presenta error,revise que es string"})
  @MinLength(10,{message: "El atributo medioPago presenta error, necesita minimo 10 caracteres"})
  @MaxLength(20,{message: "El atributo medioPago presenta error, necesita como maximo 20 caracteres"})
	readonly medioPago: string;
}
