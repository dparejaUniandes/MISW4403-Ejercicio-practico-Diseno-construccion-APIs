import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { BookEntity } from './book.entity';
import { CreateBookDto } from './create-book.dto';
import { UpdateBookDto } from './update-book.dto';

@Controller('books')
@UseInterceptors(BusinessErrorsInterceptor)
export class BookController {
    constructor(private readonly bookService: BookService) {}
    
    @Get()
    async findAll() {
        return await this.bookService.findAll();
    }

    @Get(':bookId')
    async findOne(@Param('bookId') bookId: string) {
        return await this.bookService.findOne(bookId);
    }

    @Post()
    async create(@Body() bookDto: CreateBookDto) {
        const book: BookEntity = plainToInstance(BookEntity, bookDto);
        return await this.bookService.create(book);
    }

    @Put(':bookId')
    async update(@Param('bookId') bookId: string, @Body() bookDto: UpdateBookDto) {
        const book: BookEntity = plainToInstance(BookEntity, bookDto);
        return await this.bookService.update(bookId, book);
    }

    @Delete(':bookId')
    @HttpCode(204)
    async delete(@Param('bookId') bookId: string) {
        return await this.bookService.delete(bookId);
    }
} 