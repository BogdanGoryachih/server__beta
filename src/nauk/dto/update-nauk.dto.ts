import { PartialType } from '@nestjs/mapped-types';
import { CreateNaukDto } from './create-nauk.dto';

export class UpdateNaukDto extends PartialType(CreateNaukDto) {}
