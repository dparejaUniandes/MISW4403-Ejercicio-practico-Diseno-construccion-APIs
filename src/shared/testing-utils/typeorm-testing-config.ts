import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../../book/book.entity';
import { LibraryEntity } from '../../library/library.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [BookEntity, LibraryEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([BookEntity, LibraryEntity]),
];