import { Body, Controller, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { BibliotecaEntity } from './biblioteca.entity';
import { BibliotecaDto } from './biblioteca.dto';

@Controller('bibliotecas')
@UseInterceptors(BusinessErrorsInterceptor)
export class BibliotecaController {
    constructor(private readonly museumService: BibliotecaService) {}

    @Post()
    async create(@Body() bibliotecaDto: BibliotecaDto) {
        const biblioteca: BibliotecaEntity = plainToInstance(BibliotecaEntity, bibliotecaDto);
        return await this.museumService.create(biblioteca);
    }

    @Put(':bibliotecaId')
    async update(@Param('bibliotecaId') bibliotecaId: string, @Body() bibliotecaDto: BibliotecaDto) {
        const biblioteca: BibliotecaEntity = plainToInstance(BibliotecaEntity, bibliotecaDto);
        return await this.museumService.update(bibliotecaId, biblioteca);
    }

}
