import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/book/book.entity';
import { LibraryEntity } from 'src/library/library.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class LibraryBookService {
    constructor(
        @InjectRepository(LibraryEntity)
        private readonly libraryRepository: Repository<LibraryEntity>,
    
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>
    ) {}

    async addBookToLibrary(libraryId: string, bookId: string): Promise<LibraryEntity> {
        const book: BookEntity | null = await this.bookRepository.findOne({where: {id: bookId}});
        if (!book)
          throw new BusinessLogicException("The book with the given id was not found", BusinessError.NOT_FOUND);
      
        const library: LibraryEntity | null = await this.libraryRepository.findOne({where: {id: libraryId}, relations: ["books"]})
        if (!library)
          throw new BusinessLogicException("The library with the given id was not found", BusinessError.NOT_FOUND);
    
        library.books = [...library.books, book];
        return await this.libraryRepository.save(library);
    }

    async findBooksFromLibrary(libraryId: string): Promise<BookEntity[]> {
        const library: LibraryEntity | null = await this.libraryRepository.findOne({where: {id: libraryId}, relations: ["books"]});
        if (!library)
          throw new BusinessLogicException("The library with the given id was not found", BusinessError.NOT_FOUND)
       
        return library.books;
    }
    
    async findBookFromLibrary(libraryId: string, bookId: string): Promise<BookEntity> {
        const book: BookEntity | null = await this.bookRepository.findOne({where: {id: bookId}});
        if (!book)
          throw new BusinessLogicException("The book with the given id was not found", BusinessError.NOT_FOUND)
       
        const library: LibraryEntity | null = await this.libraryRepository.findOne({where: {id: libraryId}, relations: ["books"]});
        if (!library)
          throw new BusinessLogicException("The library with the given id was not found", BusinessError.NOT_FOUND)
   
        const libraryBook: BookEntity | undefined = library.books.find(e => e.id === book.id);
   
        if (!libraryBook)
          throw new BusinessLogicException("The book with the given id is not associated to the library", BusinessError.PRECONDITION_FAILED)
   
        return libraryBook;
    }
    
    async updateBooksFromLibrary(libraryId: string, books: BookEntity[]): Promise<LibraryEntity> {
        const library: LibraryEntity | null = await this.libraryRepository.findOne({where: {id: libraryId}, relations: ["books"]});
    
        if (!library)
          throw new BusinessLogicException("The library with the given id was not found", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < books.length; i++) {
          const book: BookEntity | null = await this.bookRepository.findOne({where: {id: books[i].id}});
          if (!book)
            throw new BusinessLogicException("The book with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        library.books = books;
        return await this.libraryRepository.save(library);
    }
    
    async deleteBookFromLibrary(libraryId: string, bookId: string){
        const book: BookEntity | null = await this.bookRepository.findOne({where: {id: bookId}});
        if (!book)
          throw new BusinessLogicException("The book with the given id was not found", BusinessError.NOT_FOUND)
    
        const library: LibraryEntity | null = await this.libraryRepository.findOne({where: {id: libraryId}, relations: ["books"]});
        if (!library)
          throw new BusinessLogicException("The library with the given id was not found", BusinessError.NOT_FOUND)
    
        const libraryBook: BookEntity | undefined = library.books.find(e => e.id === book.id);
    
        if (!libraryBook)
            throw new BusinessLogicException("The book with the given id is not associated to the library", BusinessError.PRECONDITION_FAILED)
 
        library.books = library.books.filter(e => e.id !== bookId);
        await this.libraryRepository.save(library);
    }
} 