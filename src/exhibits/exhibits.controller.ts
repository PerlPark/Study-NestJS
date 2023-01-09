import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { UpdateExhibitDto } from './dto/update-exhibit.dto';
import { Exhibit } from './entities/exhibit.entity';
import { ExhibitsService } from './exhibits.service';

@Controller('exhibits')
export class ExhibitsController {
  constructor(readonly exhibitsService: ExhibitsService) {}

  @Get()
  getAll(): Exhibit[] {
    return this.exhibitsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') exhibitId: number): Exhibit {
    return this.exhibitsService.getOne(exhibitId);
  }

  @Post()
  create(@Body() exhibitData: CreateExhibitDto) {
    return this.exhibitsService.create(exhibitData);
  }

  @Delete(':id')
  remove(@Param('id') exhibitId: number) {
    return this.exhibitsService.deleteOne(exhibitId);
  }

  @Patch(':id')
  patch(@Param('id') exhibitId: number, @Body() updateData: UpdateExhibitDto) {
    return this.exhibitsService.update(exhibitId, updateData);
  }
}
