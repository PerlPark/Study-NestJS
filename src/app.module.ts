import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ExhibitsModule } from './exhibits/exhibits.module';

@Module({
  imports: [ExhibitsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
