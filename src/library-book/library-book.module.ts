import { Module } from '@nestjs/common';
import { LibraryBookService } from './library-book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryEntity } from 'src/library/library.entity';
import { BookEntity } from 'src/book/book.entity';

@Module({
  providers: [LibraryBookService],
  imports: [TypeOrmModule.forFeature([LibraryEntity, BookEntity])],
})
export class LibraryBookModule {}
