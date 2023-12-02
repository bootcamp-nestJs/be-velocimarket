import { IsInt, IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateProductImage{
  @IsInt({message: "El atributo número debe ser un entero positivo"})
  @IsNotEmpty({message: "El atributo producto_id presenta error, no puede ser un campo vacío"})
  producto_id: number;
  
  @IsString({message: "El atributo nombre presenta error,revise que es string"})
  @IsNotEmpty({message: "El atributo producto_id presenta error, no puede ser un campo vacío"})
  imagen: string;
}