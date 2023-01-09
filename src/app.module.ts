import { Module } from '@nestjs/common';
import { ExhibitsController } from './exhibits/exhibits.controller';
import { ExhibitsService } from './exhibits/exhibits.service';

@Module({
  imports: [],
  controllers: [ExhibitsController],
  providers: [ExhibitsService],
})
export class AppModule {}
