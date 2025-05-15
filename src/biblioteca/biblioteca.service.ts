import { Injectable } from '@nestjs/common';
import { BibliotecaEntity } from './biblioteca.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class BibliotecaService {
    constructor(
       @InjectRepository(BibliotecaEntity)
       private readonly bibliotecaRepository: Repository<BibliotecaEntity>
   ){}

   async create(biblioteca: BibliotecaEntity): Promise<BibliotecaEntity> {
       return await this.bibliotecaRepository.save(biblioteca);
   }

   async update(id: string, biblioteca: BibliotecaEntity): Promise<BibliotecaEntity> {
       const bibliotecaPersistida: BibliotecaEntity = await this.bibliotecaRepository.findOne({where:{id}});
       if (!bibliotecaPersistida)
         throw new BusinessLogicException("La biblioteca con el identificador dado no fue encontrada", BusinessError.NOT_FOUND);
       
       return await this.bibliotecaRepository.save({...bibliotecaPersistida, ...biblioteca});
   }
}
