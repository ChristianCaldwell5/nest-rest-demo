import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalDTO } from './dto/animal.dto';
import { Animal, AnimalDocument } from './schemas/animal.schema';

@Controller('animals')
export class AnimalsController {

    constructor(
        private animalsService: AnimalsService
    ) {}

    ANIMAL_ARRAY = ['cheetah', 'alligator', 'bunny', 'cat', 'dog'];

    @Get()
    getAllAnimals(): any {
        return this.animalsService.findAll().catch((err) => {
            console.log(err); // TODO: create custom exception handler
        });
    }

    @Get(':index')
    getOneAnimal(@Param() params): string {
        return this.ANIMAL_ARRAY[params.index];
    }

    @Post()
    addAnimal(@Body() body: AnimalDTO): any {
        return this.animalsService.create(body).catch((err) => {
            console.log(err); // TODO: create custom exception handler
        });
    }

    @Put(':index')
    updateAnimal(@Body() body, @Param() params): string {
        this.ANIMAL_ARRAY[params.index] = body.name;
        return body.name;
    }

    @Delete(':index')
    deleteAnimal(@Param() params): string {
        const animalDeleted = this.ANIMAL_ARRAY.splice(params.index, 1)
        return animalDeleted[0];
    }

}
