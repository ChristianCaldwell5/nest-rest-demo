import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalDTO } from './dto/animal.dto';
import { AnimalError } from './errors/animal.error';
import { AnimalException } from './exceptions/animal.exception';

@Controller('animals')
export class AnimalsController {

    constructor(
        private animalsService: AnimalsService
    ) {}

    @Get()
    getAllAnimals(): any {
        return this.animalsService.findAll()
            .catch((err) => {
                throw new AnimalException(err.message, err.status);
            });
    }

    @Get(':id')
    getOneAnimal(@Param() params): any {
        return this.animalsService.findOne(params.id)
            .then((res) => {
                if (!res) {
                    throw new AnimalError('Could not find Animal with that ID.', HttpStatus.NOT_FOUND);
                }
            })
            .catch((err) => {
                throw new AnimalException(err.message, err.status);
            });
    }

    @Post()
    addAnimal(@Body() body: AnimalDTO): any {
        return this.animalsService.create(body)
            .catch((err) => {
                throw new AnimalException(err.message, err.status);
            });
    }

    @Put(':id')
    updateFullAnimal(@Param() params, @Body() body): any {
        return this.animalsService.fullUpdate(params.id, body)
            .catch((err) => {
                throw new AnimalException(err.message, err.status);
            });
    }

    @Patch(':id')
    updatePartialAnimal(@Param() params, @Body() body): any {
        return this.animalsService.partialUpdate(params.id, body.section, body.update)
            .catch((err) => {
                throw new AnimalException(err.message, err.status);
            });
    }

    @Delete(':id')
    deleteAnimal(@Param() params): any {
        return this.animalsService.deleteOne(params.id)
            .catch((err) => {
                throw new AnimalException(err.message, err.status);
            });
    }

}
