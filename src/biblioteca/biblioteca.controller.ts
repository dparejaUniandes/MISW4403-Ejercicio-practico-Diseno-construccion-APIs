import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { BibliotecaEntity } from './biblioteca.entity';
import { CrearBibliotecaDto } from './crear-biblioteca.dto';
import { ActualizarBibliotecaDto } from './actualizar-biblioteca.dto';

@Controller('bibliotecas')
@UseInterceptors(BusinessErrorsInterceptor)
export class BibliotecaController {
    constructor(private readonly bibliotecaService: BibliotecaService) {}
    
    @Get()
    async findAll() {
        return await this.bibliotecaService.findAll();
    }

    @Get(':bibliotecaId')
    async findOne(@Param('bibliotecaId') bibliotecaId: string) {
        return await this.bibliotecaService.findOne(bibliotecaId);
    }

    @Post()
    async create(@Body() bibliotecaDto: CrearBibliotecaDto) {
        const biblioteca: BibliotecaEntity = plainToInstance(BibliotecaEntity, bibliotecaDto);
        return await this.bibliotecaService.create(biblioteca);
    }

    @Put(':bibliotecaId')
    async update(@Param('bibliotecaId') bibliotecaId: string, @Body() bibliotecaDto: ActualizarBibliotecaDto) {
        const biblioteca: BibliotecaEntity = plainToInstance(BibliotecaEntity, bibliotecaDto);
        return await this.bibliotecaService.update(bibliotecaId, biblioteca);
    }

    @Delete(':bibliotecaId')
    @HttpCode(204)
    async delete(@Param('bibliotecaId') bibliotecaId: string) {
        return await this.bibliotecaService.delete(bibliotecaId);
    }

}
