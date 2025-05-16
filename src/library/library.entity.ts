/* eslint-disable */
import { BookEntity } from '../book/book.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LibraryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    address: string;
    
    @Column()
    city: string;
    
    @Column()
    opening_time: number;

    @Column()
    closing_time: number;

    @ManyToMany(() => BookEntity, book => book.libraries)
    @JoinTable()
    books: BookEntity[];
}
