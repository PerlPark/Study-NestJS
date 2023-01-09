import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateExhibitDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly startDate: number;

  @IsNumber()
  readonly endDate: number;

  @IsArray()
  @IsString({ each: true })
  readonly location: string[];
}
