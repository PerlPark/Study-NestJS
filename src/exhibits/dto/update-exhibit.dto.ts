import { PartialType } from '@nestjs/mapped-types';
import { CreateExhibitDto } from './create-exhibit.dto';

export class UpdateExhibitDto extends PartialType(CreateExhibitDto) {}
