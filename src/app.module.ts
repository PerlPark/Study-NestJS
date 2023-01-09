import { Module } from '@nestjs/common';
import { ExhibitsModule } from './exhibits/exhibits.module';

@Module({
  imports: [ExhibitsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
