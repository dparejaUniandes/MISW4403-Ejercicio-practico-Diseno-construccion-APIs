/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { LibraryService } from './library.service';
import { Repository } from 'typeorm';
import { LibraryEntity } from './library.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('LibraryService', () => {
  let service: LibraryService;
  let repository: Repository<LibraryEntity>;
  let librariesList: LibraryEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [LibraryService],
    }).compile();

    service = module.get<LibraryService>(LibraryService);
    repository = module.get<Repository<LibraryEntity>>(getRepositoryToken(LibraryEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
   repository.clear();
   librariesList = [];
   for(let i = 0; i < 5; i++){
       const library: LibraryEntity = await repository.save({
       name: faker.company.name(),
       address: faker.location.secondaryAddress(),
       city: faker.location.city(),
       opening_time: 8,
       closing_time: 17
      })
       librariesList.push(library);
   }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all libraries', async () => {
    const libraries: LibraryEntity[] = await service.findAll();
    expect(libraries).not.toBeNull();
    expect(libraries).toHaveLength(librariesList.length);
  });

  it('findOne should return a library by id', async () => {
    const storedLibrary: LibraryEntity = librariesList[0];
    const library: LibraryEntity = await service.findOne(storedLibrary.id);
    expect(library).not.toBeNull();
    expect(library.name).toEqual(storedLibrary.name)
    expect(library.address).toEqual(storedLibrary.address)
    expect(library.city).toEqual(storedLibrary.city)
    expect(library.closing_time).toEqual(storedLibrary.closing_time)
    expect(library.opening_time).toEqual(storedLibrary.opening_time)
  });

  it('findOne should throw an exception for an invalid library', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The library with the given identifier was not found")
  });

  it('create should return a new library', async () => {
    const library: LibraryEntity = {
      id: "",
      name: faker.company.name(),
      address: faker.location.secondaryAddress(),
      city: faker.location.city(),
      opening_time: 7,
      closing_time: 17,
      books: []
    }

    const newLibrary: LibraryEntity = await service.create(library);
    expect(newLibrary).not.toBeNull();

    const storedLibrary: LibraryEntity = await repository.findOne({where: {id: newLibrary.id}})
    expect(storedLibrary).not.toBeNull();
    expect(storedLibrary.name).toEqual(newLibrary.name)
    expect(storedLibrary.address).toEqual(newLibrary.address)
    expect(storedLibrary.city).toEqual(newLibrary.city)
    expect(storedLibrary.opening_time).toEqual(newLibrary.opening_time)
    expect(storedLibrary.closing_time).toEqual(newLibrary.closing_time)
  });
  
  it('create should throw an exception for an invalid library when opening_time is greater than closing_time', async () => {
    let library: LibraryEntity = librariesList[0];
    library = {
      ...library, opening_time: 14, closing_time: 8
    }
    await expect(() => service.create(library)).rejects.toHaveProperty("message", "The opening time cannot be later than the closing time")
  });

  it('create should throw an exception for an invalid library when opening_time is greater than persisted closing_time', async () => {
    let library: LibraryEntity = librariesList[0];
    library = {
      ...library, opening_time: 18
    }
    await expect(() => service.create(library)).rejects.toHaveProperty("message", "The opening time cannot be later than the closing time")
  });

  it('create should throw an exception for an invalid library when persisted opening_time is greater than closing_time', async () => {
    let library: LibraryEntity = librariesList[0];
    library = {
      ...library, closing_time: 7
    }
    await expect(() => service.create(library)).rejects.toHaveProperty("message", "The opening time cannot be later than the closing time")
  });

  it('update should modify a library', async () => {
    const library: LibraryEntity = librariesList[0];
    library.name = "New name";
    library.address = "New address";
      const updatedLibrary: LibraryEntity = await service.update(library.id, library);
    expect(updatedLibrary).not.toBeNull();
      const storedLibrary: LibraryEntity = await repository.findOne({ where: { id: library.id } })
    expect(storedLibrary).not.toBeNull();
    expect(storedLibrary.name).toEqual(library.name)
    expect(storedLibrary.address).toEqual(library.address)
  });

  it('update should throw an exception for an invalid library', async () => {
    let library: LibraryEntity = librariesList[0];
    library = {
      ...library, name: "New name", address: "New address"
    }
    await expect(() => service.update("0", library)).rejects.toHaveProperty("message", "The library with the given identifier was not found")
  });

  it('update should throw an exception for an invalid library when opening_time is greater than closing_time', async () => {
    let library: LibraryEntity = librariesList[0];
    library = {
      ...library, opening_time: 14, closing_time: 8
    }
    await expect(() => service.update(library.id, library)).rejects.toHaveProperty("message", "The opening time 14 cannot be later than the closing time 8")
  });

  it('update should throw an exception for an invalid library when opening_time is greater than persisted closing_time', async () => {
    let library: LibraryEntity = librariesList[0];
    library = {
      ...library, opening_time: 18, closing_time: undefined
    }
    await expect(() => service.update(library.id, library)).rejects.toHaveProperty("message", "The opening time 18 cannot be later than the closing time 17")
  });

  it('update should throw an exception for an invalid library when persisted opening_time is greater than closing_time', async () => {
    let library: LibraryEntity = librariesList[0];
    library = {
      ...library, closing_time: 7, opening_time: undefined
    }
    await expect(() => service.update(library.id, library)).rejects.toHaveProperty("message", "The opening time 8 cannot be later than the closing time 7")
  });

  it('delete should remove a library', async () => {
    const library: LibraryEntity = librariesList[0];
    await service.delete(library.id);
      const deletedLibrary: LibraryEntity = await repository.findOne({ where: { id: library.id } })
    expect(deletedLibrary).toBeNull();
  });

  it('delete should throw an exception for an invalid library', async () => {
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The library with the given identifier was not found")
  });
});
