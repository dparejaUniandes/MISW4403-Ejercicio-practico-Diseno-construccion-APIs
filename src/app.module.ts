/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { LibroModule } from './libro/libro.module';
import { BibliotecaEntity } from './biblioteca/biblioteca.entity';
import { LibroEntity } from './libro/libro.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'gestion_bibliotecas',
      entities: [BibliotecaEntity, LibroEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    BibliotecaModule,
    LibroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
