/* eslint-disable */
import { LibraryEntity } from '../library/library.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;
    
    @Column()
    author: string;
    
    @Column()
    publication_date: string;
    
    @Column()
    isbn: string;

    @ManyToMany(() => LibraryEntity, library => library.books)
    @JoinTable()
    libraries: LibraryEntity[];
}
