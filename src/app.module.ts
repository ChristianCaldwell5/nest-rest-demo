import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsController } from './animals/animals.controller';

@Module({
  imports: [],
  controllers: [AppController, AnimalsController],
  providers: [AppService],
})
export class AppModule {}
