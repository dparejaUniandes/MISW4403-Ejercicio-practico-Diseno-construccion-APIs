import { Module } from '@nestjs/common';
import { LibroService } from './book.service';

@Module({
  providers: [LibroService]
})
export class LibroModule {}
