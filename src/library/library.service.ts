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
        if (library.opening_time >= library.closing_time)
            throw new BusinessLogicException("The opening time cannot be later than the closing time", BusinessError.BAD_REQUEST);
        return await this.libraryRepository.save(library);
    }

    async update(id: string, library: LibraryEntity): Promise<LibraryEntity> {
        const persistedLibrary: LibraryEntity = await this.libraryRepository.findOne({where:{id}});
        if (!persistedLibrary)
            throw new BusinessLogicException("The library with the given identifier was not found", BusinessError.NOT_FOUND);

        if (!(library.opening_time && library.closing_time && library.opening_time < library.closing_time)){
            if (library.opening_time && library.closing_time && library.opening_time >= library.closing_time)
                throw new BusinessLogicException(`The opening time ${library.opening_time} cannot be later than the closing time ${library.closing_time}`, BusinessError.BAD_REQUEST);
            else if (library.opening_time  && library.opening_time >= persistedLibrary.closing_time)
                throw new BusinessLogicException(`The opening time ${library.opening_time} cannot be later than the closing time ${persistedLibrary.closing_time}`, BusinessError.BAD_REQUEST);
            else if (library.closing_time  && library.closing_time <= persistedLibrary.opening_time)
                throw new BusinessLogicException(`The opening time ${persistedLibrary.opening_time} cannot be later than the closing time ${library.closing_time}`, BusinessError.BAD_REQUEST);
        }
        
        return await this.libraryRepository.save({...persistedLibrary, ...library});
    }

    async delete(id: string) {
        const library: LibraryEntity = await this.libraryRepository.findOne({where:{id}});
        if (!library)
            throw new BusinessLogicException("The library with the given identifier was not found", BusinessError.NOT_FOUND);
     
        await this.libraryRepository.remove(library);
    }
}
