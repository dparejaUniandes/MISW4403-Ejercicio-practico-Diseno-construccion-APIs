import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';

@Module({
  providers: [BookService],
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BookController]
})
export class BookModule {}
