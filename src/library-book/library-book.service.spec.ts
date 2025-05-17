import { Test, TestingModule } from '@nestjs/testing';
import { LibraryBookService } from './library-book.service';
import { LibraryEntity } from '../library/library.entity';
import { Repository } from 'typeorm';
import { BookEntity } from '../book/book.entity';
import { faker } from '@faker-js/faker/.';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LibraryBookService', () => {
  let service: LibraryBookService;
  let libraryRepository: Repository<LibraryEntity>;
  let bookRepository: Repository<BookEntity>;
  let library: LibraryEntity;
  let booksList : BookEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [LibraryBookService],
    }).compile();

    service = module.get<LibraryBookService>(LibraryBookService);
    libraryRepository = module.get<Repository<LibraryEntity>>(getRepositoryToken(LibraryEntity));
    bookRepository = module.get<Repository<BookEntity>>(getRepositoryToken(BookEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
   bookRepository.clear();
   libraryRepository.clear();

   booksList = [];
   for(let i = 0; i < 5; i++){
      const book: BookEntity = await bookRepository.save({
       title: faker.lorem.words(),
        author: faker.person.fullName(),
        publication_date: "1997-08-15",
        isbn: faker.string.numeric(13),
        libraries: []
      })
      booksList.push(book);
    }

    library = await libraryRepository.save({
        name: faker.company.name(),
        address: faker.location.secondaryAddress(),
        city: faker.location.city(),
        opening_time: 8,
        closing_time: 17,
        books: booksList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addBookToLibrary should add an book to a library', async () => {
   const newBook: BookEntity = await bookRepository.save({
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      publication_date: "1997-08-15",
      isbn: faker.string.numeric(13)
   });

   const newLibrary: LibraryEntity = await libraryRepository.save({
      name: faker.company.name(),
      address: faker.location.secondaryAddress(),
      city: faker.location.city(),
      opening_time: 8,
      closing_time: 17
   })

   const result: LibraryEntity = await service.addBookToLibrary(newLibrary.id, newBook.id);
  
   expect(result.books.length).toBe(1);
   expect(result.books[0]).not.toBeNull();
   expect(result.books[0].title).toBe(newBook.title)
   expect(result.books[0].author).toBe(newBook.author)
   expect(result.books[0].publication_date).toBe(newBook.publication_date)
   expect(result.books[0].isbn).toBe(newBook.isbn)
 });

 it('addBookToLibrary should thrown exception for an invalid book', async () => {
   const newLibrary: LibraryEntity = await libraryRepository.save({
      name: faker.company.name(),
      address: faker.location.secondaryAddress(),
      city: faker.location.city(),
      opening_time: 8,
      closing_time: 17
   })

   await expect(() => service.addBookToLibrary(newLibrary.id, "0")).rejects.toHaveProperty("message", "The book with the given id was not found");
 });

 it('addBookToLibrary should throw an exception for an invalid library', async () => {
    const newBook: BookEntity = await bookRepository.save({
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      publication_date: "1997-08-15",
      isbn: faker.string.numeric(13)
    });

    await expect(() => service.addBookToLibrary("0", newBook.id)).rejects.toHaveProperty("message", "The library with the given id was not found");
  });

  it('findBookFromLibrary should return book by library', async () => {
    const book: BookEntity = booksList[0];
    const storedBook: BookEntity = await service.findBookFromLibrary(library.id, book.id, )
    expect(storedBook).not.toBeNull();
    expect(storedBook.title).toBe(book.title);
    expect(storedBook.author).toBe(book.author);
    expect(storedBook.publication_date).toBe(book.publication_date);
    expect(storedBook.isbn).toBe(book.isbn);
  });

  it('findBookFromLibrary should throw an exception for an invalid book', async () => {
    await expect(()=> service.findBookFromLibrary(library.id, "0")).rejects.toHaveProperty("message", "The book with the given id was not found");
  });

  it('findBookFromLibrary should throw an exception for an invalid library', async () => {
    const book: BookEntity = booksList[0];
    await expect(()=> service.findBookFromLibrary("0", book.id)).rejects.toHaveProperty("message", "The library with the given id was not found");
  });

  it('findBookFromLibrary should throw an exception for an book not associated to the library', async () => {
    const newBook: BookEntity = await bookRepository.save({
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      publication_date: "1997-08-15",
      isbn: faker.string.numeric(13)
    });

    await expect(()=> service.findBookFromLibrary(library.id, newBook.id)).rejects.toHaveProperty("message", "The book with the given id is not associated to the library");
  });

  it('findBooksFromLibrary should return books by library', async ()=>{
    const books: BookEntity[] = await service.findBooksFromLibrary(library.id);
    expect(books.length).toBe(5)
  });

  it('findBooksFromLibrary should throw an exception for an invalid library', async () => {
    await expect(()=> service.findBooksFromLibrary("0")).rejects.toHaveProperty("message", "The library with the given id was not found");
  });

  it('updateBooksFromLibrary should update books list for a library', async () => {
    const newBook: BookEntity = await bookRepository.save({
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      publication_date: "1997-08-15",
      isbn: faker.string.numeric(13)
    });

    const updatedLibrary: LibraryEntity = await service.updateBooksFromLibrary(library.id, [newBook]);
    expect(updatedLibrary.books.length).toBe(1);

    expect(updatedLibrary.books[0].title).toBe(newBook.title);
    expect(updatedLibrary.books[0].author).toBe(newBook.author);
    expect(updatedLibrary.books[0].publication_date).toBe(newBook.publication_date);
    expect(updatedLibrary.books[0].isbn).toBe(newBook.isbn);
  });

  it('updateBooksFromLibrary should throw an exception for an invalid library', async () => {
    const newBook: BookEntity = await bookRepository.save({
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      publication_date: "1997-08-15",
      isbn: faker.string.numeric(13)
    });

    await expect(()=> service.updateBooksFromLibrary("0", [newBook])).rejects.toHaveProperty("message", "The library with the given id was not found");
  });

  it('updateBooksFromLibrary should throw an exception for an invalid book', async () => {
    const newBook: BookEntity = booksList[0];
    newBook.id = "0";

    await expect(()=> service.updateBooksFromLibrary(library.id, [newBook])).rejects.toHaveProperty("message", "The book with the given id was not found");
  });

  it('deleteBookFromLibrary should remove a book from a library', async () => {
    const book: BookEntity = booksList[0];
    
    await service.deleteBookFromLibrary(library.id, book.id);

    const storedLibrary: LibraryEntity = await libraryRepository.findOne({where: {id: library.id}, relations: ["books"]});
    const deletedBook: BookEntity = storedLibrary.books.find(a => a.id === book.id);

    expect(deletedBook).toBeUndefined();

  });

  it('deleteBookToLibrary should thrown an exception for an invalid book', async () => {
    await expect(()=> service.deleteBookFromLibrary(library.id, "0")).rejects.toHaveProperty("message", "The book with the given id was not found");
  });

  it('deleteBookToLibrary should thrown an exception for an invalid library', async () => {
    const book: BookEntity = booksList[0];
    await expect(()=> service.deleteBookFromLibrary("0", book.id)).rejects.toHaveProperty("message", "The library with the given id was not found");
  });

  it('deleteBookFromLibrary should thrown an exception for an non associated book', async () => {
    const newBook: BookEntity = await bookRepository.save({
      title: faker.lorem.words(),
      author: faker.person.fullName(),
      publication_date: "1997-08-15",
      isbn: faker.string.numeric(13)
    });

    await expect(()=> service.deleteBookFromLibrary(library.id, newBook.id)).rejects.toHaveProperty("message", "The book with the given id is not associated to the library");
  });
});
