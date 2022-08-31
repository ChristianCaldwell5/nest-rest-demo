import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalDTO } from './dto/animal.dto';

@Controller('animals')
export class AnimalsController {

    constructor(
        private animalsService: AnimalsService
    ) {}

    @Get()
    getAllAnimals(): any {
        return this.animalsService.findAll().catch((err) => {
            console.log(err); // TODO: create custom exception handler
        });
    }

    @Get(':id')
    getOneAnimal(@Param() params): any {
        console.log(params.id)
        return this.animalsService.findOne(params.id).catch((err) => {
            console.log(err); // TODO: create custom exception handler
        });
    }

    @Post()
    addAnimal(@Body() body: AnimalDTO): any {
        return this.animalsService.create(body).catch((err) => {
            console.log(err); // TODO: create custom exception handler
        });
    }

    @Put()
    updateAnimal(@Body() body): any {
        return this.animalsService.fullUpdate(body).catch((err) => {
            console.log(err); // TODO: create custom exception handler
        })
    }

    @Delete(':id')
    deleteAnimal(@Param() params): any {
        return this.animalsService.deleteOne(params.id).catch((err) => {
            console.log(err); // TODO: create custom exception handler
        })
    }

}
