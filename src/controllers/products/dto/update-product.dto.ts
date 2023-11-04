import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsDateString, IsInt, IsOptional, IsPositive, IsString, IsUUID, MaxLength, Min, MinLength, isDate, isDateString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto extends PartialType(CreateProductDto) {}
