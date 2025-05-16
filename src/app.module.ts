/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryModule } from './library/library.module';
import { BookModule } from './book/book.module';
import { LibraryEntity } from './library/library.entity';
import { BookEntity } from './book/book.entity';
import { LibraryBookModule } from './library-book/library-book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'gestion_bibliotecas',
      entities: [LibraryEntity, BookEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    LibraryModule,
    BookModule,
    LibraryBookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
