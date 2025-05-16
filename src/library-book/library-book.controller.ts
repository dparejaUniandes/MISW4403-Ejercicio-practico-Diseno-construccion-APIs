import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { LibraryBookService } from './library-book.service';
import { plainToInstance } from 'class-transformer';
import { BookEntity } from '../book/book.entity';
import { CreateBookDto } from '../book/create-book.dto';

@Controller('libraries')
@UseInterceptors(BusinessErrorsInterceptor)
export class LibraryBookController {
    constructor(private readonly libraryBookService: LibraryBookService) {}

    @Post(':libraryId/books/:bookId')
    async addBookToLibrary(@Param('libraryId') libraryId: string, @Param('bookId') bookId: string) {
        return await this.libraryBookService.addBookToLibrary(libraryId, bookId);
    }

    @Get(':libraryId/books/:bookId')
    async findBookFromLibrary(@Param('libraryId') libraryId: string, @Param('bookId') bookId: string) {
        return await this.libraryBookService.findBookFromLibrary(libraryId, bookId);
    }

    @Get(':libraryId/books')
    async findBooksFromLibrary(@Param('libraryId') libraryId: string) {
        return await this.libraryBookService.findBooksFromLibrary(libraryId);
    }

    @Put(':libraryId/books')
    async updateBooksFromLibrary(@Body() booksDto: CreateBookDto[], @Param('libraryId') libraryId: string) {
        const books = plainToInstance(BookEntity, booksDto)
        return await this.libraryBookService.updateBooksFromLibrary(libraryId, books);
    }

    @Delete(':libraryId/books/:bookId')
    @HttpCode(204)
    async deleteBookFromLibrary(@Param('libraryId') libraryId: string, @Param('bookId') bookId: string) {
        return await this.libraryBookService.deleteBookFromLibrary(libraryId, bookId);
    }
} 