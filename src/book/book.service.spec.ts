/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('BookService', () => {
  let service: BookService;
  let repository: Repository<BookEntity>;
  let booksList: BookEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [BookService],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<Repository<BookEntity>>(getRepositoryToken(BookEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    booksList = [];
    for(let i = 0; i < 5; i++){
      const book: BookEntity = await repository.save({
        title: faker.lorem.words(),
        author: faker.person.fullName(),
        publication_date: "1997-08-15",
        isbn: faker.string.numeric(13),
        libraries: []
      })
      booksList.push(book);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all books', async () => {
    const books: BookEntity[] = await service.findAll();
    expect(books).not.toBeNull();
    expect(books).toHaveLength(booksList.length);
  });

  it('findOne should return a book by id', async () => {
    const storedBook: BookEntity = booksList[0];
    const book: BookEntity = await service.findOne(storedBook.id);
    expect(book).not.toBeNull();
    expect(book.title).toEqual(storedBook.title);
    expect(book.author).toEqual(storedBook.author);
    expect(book.publication_date).toEqual(storedBook.publication_date);
    expect(book.isbn).toEqual(storedBook.isbn);
  });

  it('findOne should throw an exception for an invalid book', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The book with the given identifier was not found");
  });

  it('create should return a new book', async () => {
    const book: BookEntity = {
      id: "",
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      publication_date: "2023-08-15",
      isbn: faker.string.numeric(13),
      libraries: []
    }

    const newBook: BookEntity = await service.create(book);
    expect(newBook).not.toBeNull();

    const storedBook: BookEntity = await repository.findOne({where: {id: newBook.id}})
    expect(storedBook).not.toBeNull();
    expect(storedBook.title).toEqual(newBook.title);
    expect(storedBook.author).toEqual(newBook.author);
    expect(storedBook.publication_date).toEqual(newBook.publication_date);
    expect(storedBook.isbn).toEqual(newBook.isbn);
  });

  it('create should throw an exception for invalid date format', async () => {
    const book: BookEntity = {
      id: "",
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      publication_date: "15/08/2023",
      isbn: faker.string.numeric(13),
      libraries: []
    }
    await expect(() => service.create(book)).rejects.toHaveProperty("message", "The publication date is not in the YYYY-MM-DD format");
  });

  it('create should throw an exception for future publication date', async () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const book: BookEntity = {
      id: "",
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      publication_date: futureDate.toISOString().slice(0, 10),
      isbn: faker.string.numeric(13),
      libraries: []
    }
    await expect(() => service.create(book)).rejects.toHaveProperty("message", "The publication date is greater than the current date");
  });

  it('update should modify a book', async () => {
    const book: BookEntity = booksList[0];
    book.title = "New title";
    book.author = "New author";
    const updatedBook: BookEntity = await service.update(book.id, book);
    expect(updatedBook).not.toBeNull();
    
    const storedBook: BookEntity = await repository.findOne({where: {id: book.id}})
    expect(storedBook).not.toBeNull();
    expect(storedBook.title).toEqual(book.title);
    expect(storedBook.author).toEqual(book.author);
  });

  it('update should throw an exception for an invalid book', async () => {
    let book: BookEntity = booksList[0];
    book = {
      ...book, title: "New title"
    }
    await expect(() => service.update("0", book)).rejects.toHaveProperty("message", "The book with the given identifier was not found");
  });

  it('update should throw an exception for future publication date', async () => {
    const book: BookEntity = booksList[0];
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    book.publication_date = futureDate.toISOString().slice(0, 10);
    await expect(() => service.update(book.id, book)).rejects.toHaveProperty("message", "The publication date is greater than the current date");
  });

  it('delete should remove a book', async () => {
    const book: BookEntity = booksList[0];
    await service.delete(book.id);
    const deletedBook: BookEntity = await repository.findOne({where: {id: book.id}})
    expect(deletedBook).toBeNull();
  });

  it('delete should throw an exception for an invalid book', async () => {
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The book with the given identifier was not found");
  });
}); 