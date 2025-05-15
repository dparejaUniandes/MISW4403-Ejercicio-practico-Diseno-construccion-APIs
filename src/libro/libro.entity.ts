/* eslint-disable */
import { BibliotecaEntity } from '../biblioteca/biblioteca.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LibroEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;
    
    @Column()
    autor: string;
    
    @Column()
    fecha_publicacion: string;
    
    @Column()
    isbn: string;

    @ManyToMany(() => BibliotecaEntity, biblioteca => biblioteca.libros)
    @JoinTable()
    bibliotecas: BibliotecaEntity[];
}
