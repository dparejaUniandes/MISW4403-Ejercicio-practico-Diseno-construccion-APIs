import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { LibraryService } from './library.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { LibraryEntity } from './library.entity';
import { CreateLibraryDto } from './create-library.dto';
import { UpdateLibraryDto } from './update-library.dto';

@Controller('libraries')
@UseInterceptors(BusinessErrorsInterceptor)
export class LibraryController {
    constructor(private readonly libraryService: LibraryService) {}
    
     @Get()
    async findAll() {
        return await this.libraryService.findAll();
    }

    @Get(':libraryId')
    async findOne(@Param('libraryId') libraryId: string) {
        return await this.libraryService.findOne(libraryId);
    }

    @Post()
    async create(@Body() libraryDto: CreateLibraryDto) {
        const library: LibraryEntity = plainToInstance(LibraryEntity, libraryDto);
        return await this.libraryService.create(library);
    }

    @Put(':libraryId')
    async update(@Param('libraryId') libraryId: string, @Body() libraryDto: UpdateLibraryDto) {
        const library: LibraryEntity = plainToInstance(LibraryEntity, libraryDto);
        return await this.libraryService.update(libraryId, library);
    }

    @Delete(':libraryId')
    @HttpCode(204)
    async delete(@Param('libraryId') libraryId: string) {
        return await this.libraryService.delete(libraryId);
    }

}
