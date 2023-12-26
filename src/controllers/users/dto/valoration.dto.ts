import { IsAlphanumeric, IsEmail, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsPhoneNumber, IsPositive, IsString, Max, MaxLength, MinLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class valorateUserDto {

    @ApiProperty({
        type: 'number',
        example: 8,
        minimum: 1,
        required: true,
        description: "Id de usuario",
        title: "userId"
    })
    @IsInt({message: "El atributo Id de usuario debe ser un entero positivo"})
    @IsNotEmpty({message: "El atributo Id de usuario presenta error, no puede ser un campo vacío"})
    @IsPositive({message: "El atributo Id de usuario debe ser un entero positivo"})
    readonly userId: number;

    @ApiProperty({
        type: 'number',
        example: 5,
        minimum: 0,
        required: true,
        description: "Valoracion del usuario",
        title: "Valoracion"
    })
    @IsInt({message: "El atributo valoracion debe ser un entero positivo"})
    @IsNotEmpty({message: "El atributo valoracion presenta error, no puede ser un campo vacío"})
    @Max(5)
    readonly valoracion: number;

}
