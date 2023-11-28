import { ApiProperty } from "@nestjs/swagger";

export class CredentialsDto {
  @ApiProperty({
    type: 'string',
    example: 'user.velo@velocimarket.cl',
    required: true,
    description: "Nombre de usuario",
    title: "User Name"
  })
  readonly user_name: string;

  @ApiProperty({
    type: 'string',
    example: 'BuenaClave.1234',
    required: true,
    description: "Contraseña del usuario",
    title: "Password"
  })
  readonly password: string
}