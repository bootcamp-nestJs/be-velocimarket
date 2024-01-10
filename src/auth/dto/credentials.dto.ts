import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CredentialsDto {
  @ApiProperty({
    type: 'string',
    example: 'user.velo@velocimarket.cl',
    required: true,
    description: "Nombre de usuario",
    title: "User Name"
  })
  @IsString({message: "UserName debe ser string"})
  @IsNotEmpty({message: "El atributo user_name no puede ser un campo vacío"})
  readonly user_name: string;

  @ApiProperty({
    type: 'string',
    example: 'BuenaClave.1234',
    required: true,
    description: "Contraseña del usuario",
    title: "Password"
  })
  @IsNotEmpty({message: "El atributo password no puede ser un campo vacío"})
  readonly password: string;
}