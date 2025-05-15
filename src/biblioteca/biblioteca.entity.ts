/* eslint-disable */
import { LibroEntity } from '../libro/libro.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BibliotecaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
    
    @Column()
    direccion: string;
    
    @Column()
    ciudad: string;
    
    @Column()
    hora_apertura: number;

    @Column()
    hora_cierre: number;

    @ManyToMany(() => LibroEntity, libro => libro.bibliotecas)
    @JoinTable()
    libros: LibroEntity[];
}
