import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsController } from './animals/animals.controller';

// MongoDB Object Modeling Tool
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/demo'), // MongoDB Connection
    AnimalsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
