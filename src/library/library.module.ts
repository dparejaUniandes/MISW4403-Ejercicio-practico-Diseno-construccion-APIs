import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryEntity } from './library.entity';
import { LibraryController } from './library.controller';

@Module({
  providers: [LibraryService],
  imports: [TypeOrmModule.forFeature([LibraryEntity])],
  controllers: [LibraryController],
})
export class LibraryModule {}
