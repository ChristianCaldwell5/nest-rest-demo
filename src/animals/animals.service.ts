import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from './schemas/animal.schema';
import { AnimalDTO } from './dto/animal.dto';
import { AnimalError } from './errors/animal.error';

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

  async findOne(id: string): Promise<Animal> {
    if (!id) {
        throw new AnimalError('ID is required to find Animal.', HttpStatus.BAD_REQUEST);
    }
    return this.animalModel.findOne({_id: id}).lean();
  }

  async fullUpdate(id: string, animal: Animal): Promise<any> {
    if (!id || !animal) {
        throw new AnimalError('Please pass an ID and full Animal object.', HttpStatus.BAD_REQUEST);
    }

    return this.animalModel.updateOne({_id: id}, animal)
        .then((res) => {
            // check if there was no match
            if (res.matchedCount === 0) {
                throw new AnimalError('Could not find Animal with that ID.', HttpStatus.NOT_FOUND);
            }
        })
        .catch((e) => {
            throw new AnimalError('Could not find Animal with that ID.', HttpStatus.NOT_FOUND);
        });
  }

  async partialUpdate(id: string, section: any, update: Partial<Animal>): Promise<any> {
    
    if (!id || !section || !update) {
        throw new AnimalError('Please do not pass empty values.', HttpStatus.BAD_REQUEST);
    }

    return this.animalModel.findOne({_id: id})
        .then((res) => {
            if (res[section]) {
                res[section] = update;
                res.save();
            } else {
                throw new AnimalError(`Section '${section}' does not exist for Animal.`, HttpStatus.BAD_REQUEST);
            }
        })
        .catch((e) => {
            throw new AnimalError('Could not find Animal with that ID.', HttpStatus.NOT_FOUND);
        });
  }

  async deleteOne(id: string): Promise<any> {
    if (!id) {
        throw new AnimalError('ID is required to find Animal for deletion.', HttpStatus.BAD_REQUEST);
    }
    return this.animalModel.deleteOne({_id: id})
        .then((res) => {
            if (res.deletedCount === 0) {
                throw new AnimalError('Could not find Animal with that ID.', HttpStatus.NOT_FOUND);
            }
        })
        .catch((e) => {
            throw new AnimalError('Could not find Animal with that ID.', HttpStatus.NOT_FOUND);
        });
  }
}
