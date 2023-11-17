import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsAlphanumeric, IsEmail, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsPositive, IsString, MaxLength, MinLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {}


