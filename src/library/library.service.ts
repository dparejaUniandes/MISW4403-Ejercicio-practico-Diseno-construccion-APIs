import { Injectable } from '@nestjs/common';
import { LibraryEntity } from './library.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class LibraryService {
    constructor(
       @InjectRepository(LibraryEntity)
       private readonly libraryRepository: Repository<LibraryEntity>
   ){}

   async findAll(): Promise<LibraryEntity[]> {
        return await this.libraryRepository.find({ relations: ["books"] });
    }

    async findOne(id: string): Promise<LibraryEntity> {
        const library: LibraryEntity = await this.libraryRepository.findOne({where: {id}, relations: ["books"] });
        if (!library)
            throw new BusinessLogicException("The library with the given identifier was not found", BusinessError.NOT_FOUND);
    
        return library;
    }

    async create(library: LibraryEntity): Promise<LibraryEntity> {
        return await this.libraryRepository.save(library);
    }

    async update(id: string, library: LibraryEntity): Promise<LibraryEntity> {
        const persistedLibrary: LibraryEntity = await this.libraryRepository.findOne({where:{id}});
        if (!persistedLibrary)
            throw new BusinessLogicException("The library with the given identifier was not found", BusinessError.NOT_FOUND);
        
        return await this.libraryRepository.save({...persistedLibrary, ...library});
    }

    async delete(id: string) {
        const library: LibraryEntity = await this.libraryRepository.findOne({where:{id}});
        if (!library)
            throw new BusinessLogicException("The library with the given identifier was not found", BusinessError.NOT_FOUND);
     
        await this.libraryRepository.remove(library);
    }
}
