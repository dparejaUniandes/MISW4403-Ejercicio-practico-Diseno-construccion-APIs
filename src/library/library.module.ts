import { Module } from '@nestjs/common';
import { BibliotecaService } from './library.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaEntity } from './library.entity';
import { BibliotecaController } from './library.controller';

@Module({
  providers: [BibliotecaService],
  imports: [TypeOrmModule.forFeature([BibliotecaEntity])],
  controllers: [BibliotecaController],
})
export class BibliotecaModule {}
