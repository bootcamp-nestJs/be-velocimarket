import { IsInt, IsPositive } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class addProductCartDto {
  @ApiProperty({
    type: 'number',
    example: 1,
    minimum: 1,
    required: true,
    description: "Id del carrito",  
    title: "carrotiId"
  })
  @IsInt({message: "El atributo carrotiId presenta error,revise que es numerico"})
  @IsPositive({ message: "El atributo carrotiId presenta error, debe ser mayor a cero" })
  readonly carrotiId: number;

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

}
