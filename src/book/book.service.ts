import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>
    ) {}

    async findAll(): Promise<BookEntity[]> {
        return await this.bookRepository.find({ relations: ["libraries"] });
    }

    async findOne(id: string): Promise<BookEntity> {
        const book: BookEntity = await this.bookRepository.findOne({where: {id}, relations: ["libraries"] });
        if (!book)
            throw new BusinessLogicException("The book with the given identifier was not found", BusinessError.NOT_FOUND);
    
        return book;
    }

    async create(book: BookEntity): Promise<BookEntity> {
        if (!this.isValidDate(book.publication_date))
            throw new BusinessLogicException("The publication date is not in the YYYY-MM-DD format", BusinessError.BAD_REQUEST);
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        if (formattedDate < book.publication_date)
            throw new BusinessLogicException("The publication date is greater than the current date", BusinessError.PRECONDITION_FAILED);
        return await this.bookRepository.save(book);
    }

    async update(id: string, book: BookEntity): Promise<BookEntity> {
        if (book.publication_date) {
            if (!this.isValidDate(book.publication_date))
                throw new BusinessLogicException("The publication date is not in the YYYY-MM-DD format", BusinessError.BAD_REQUEST);
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 10);
            if (formattedDate < book.publication_date)
                throw new BusinessLogicException("The publication date is greater than the current date", BusinessError.PRECONDITION_FAILED);
        }

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

    isValidDate(dateString: string): boolean {
        return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}
} 
