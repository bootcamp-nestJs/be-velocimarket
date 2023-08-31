import { PartialType } from '@nestjs/swagger';
import { CreateSigninDto } from './create-signin.dto';

export class UpdateSigninDto extends PartialType(CreateSigninDto) {}
