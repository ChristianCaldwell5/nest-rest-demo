import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('animals')
export class AnimalsController {

    ANIMAL_ARRAY = ['cheetah', 'alligator', 'bunny', 'cat', 'dog'];

    @Get()
    getAllAnimals(): string[] {
        return this.ANIMAL_ARRAY;
    }

    @Get(':index')
    getOneAnimal(@Param() params): string {
        return this.ANIMAL_ARRAY[params.index];
    }

    @Post()
    addAnimal(@Body() body): string {
        console.log(body);
        this.ANIMAL_ARRAY.push(body.name);
        return body.name;
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
