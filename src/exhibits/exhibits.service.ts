import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { UpdateExhibitDto } from './dto/update-exhibit.dto';
import dummy from './dummy';
import { Exhibit } from './entities/exhibit.entity';

@Injectable()
export class ExhibitsService {
  private exhibits: Exhibit[] = dummy;

  getAll(): Exhibit[] {
    return this.exhibits;
  }

  getOne(id: number): Exhibit {
    const exhibit = this.exhibits.find((exhibit) => exhibit.id === id);
    if (!exhibit) {
      throw new NotFoundException(`Not Found Exhibit width ID: ${id}`);
    }
    return exhibit;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.exhibits = this.exhibits.filter((exhibit) => exhibit.id !== id);
  }

  create(exhibitData: CreateExhibitDto) {
    this.exhibits.push({
      id: this.exhibits.length + 1,
      ...exhibitData,
    });
  }

  update(id: number, updateData: UpdateExhibitDto) {
    const exhibit = this.getOne(id);
    this.deleteOne(id);
    this.exhibits.push({ ...exhibit, ...updateData });
  }
}
