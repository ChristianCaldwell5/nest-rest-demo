import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from './schemas/animal.schema';
import { AnimalDTO } from './dto/animal.dto';

@Injectable()
export class AnimalsService {
  constructor(@InjectModel(Animal.name) private animalModel: Model<AnimalDocument>) {}

  async create(newAnimalatDTO: AnimalDTO): Promise<Animal> {
    const createdAnimal = new this.animalModel(newAnimalatDTO);
    return createdAnimal.save();
  }

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().lean();
  }
}
