import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>
    ) {}

    async findAll(): Promise<BookEntity[]> {
        return await this.bookRepository.find({ relations: ["library"] });
    }

    async findOne(id: string): Promise<BookEntity> {
        const book: BookEntity = await this.bookRepository.findOne({where: {id}, relations: ["library"] });
        if (!book)
            throw new BusinessLogicException("The book with the given identifier was not found", BusinessError.NOT_FOUND);
    
        return book;
    }

    async create(book: BookEntity): Promise<BookEntity> {
        return await this.bookRepository.save(book);
    }

    async update(id: string, book: BookEntity): Promise<BookEntity> {
        const persistedBook: BookEntity = await this.bookRepository.findOne({where:{id}});
        if (!persistedBook)
            throw new BusinessLogicException("The book with the given identifier was not found", BusinessError.NOT_FOUND);
        
        return await this.bookRepository.save({...persistedBook, ...book});
    }

    async delete(id: string) {
        const book: BookEntity = await this.bookRepository.findOne({where:{id}});
        if (!book)
            throw new BusinessLogicException("The book with the given identifier was not found", BusinessError.NOT_FOUND);
     
        await this.bookRepository.remove(book);
    }
} 
