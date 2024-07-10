import { Test, TestingModule } from "@nestjs/testing";
import { BookController } from "../book.controller";
import { BookService } from "../book.service";
import { BookDto } from "../dtos/book.dto";
import { CreateBookDto } from "../dtos/create-book.dto";
import { UpdateBookDto } from "../dtos/update-book.dto";
import { bookCreateDataSet, createBookDto } from "./test-data/test-data.book";
import { NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            isBookRented: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result: BookDto[] = [bookCreateDataSet];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      const result: BookDto = bookCreateDataSet;
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException if book not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createDto: CreateBookDto = createBookDto;
      const result: BookDto = bookCreateDataSet;
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createDto)).toBe(result);
    });

    it('should throw BadRequestException if missing required fields', async () => {
      const createDto: CreateBookDto = { ...createBookDto, title: undefined };
      jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

      await expect(controller.create(createDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException if ISBN already exists', async () => {
      const createDto: CreateBookDto = { ...createBookDto, isbn: '978-3-16-148410-0' };
      jest.spyOn(service, 'create').mockRejectedValue(new ConflictException(`O ISBN ${createDto.isbn} já está cadastrado para outro livro`));

      await expect(controller.create(createDto)).rejects.toThrow(ConflictException);
    });

    it('should throw BadRequestException if ISBN is invalid', async () => {
      const createDto: CreateBookDto = { ...createBookDto, isbn: 'invalidisbn' };
      jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException('ISBN não é válido!'));

      await expect(controller.create(createDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updateDto: UpdateBookDto = createBookDto;
      const result: BookDto = bookCreateDataSet;
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(1, updateDto)).toBe(result);
    });

    it('should throw NotFoundException if book not found', async () => {
      const updateDto: UpdateBookDto = createBookDto;
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(controller.update(999, updateDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if ISBN already exists', async () => {
      const updateDto: UpdateBookDto = { ...createBookDto, isbn: '978-3-16-148410-0' };
      jest.spyOn(service, 'update').mockRejectedValue(new ConflictException(`O ISBN ${updateDto.isbn} já está cadastrado para outro livro`));

      await expect(controller.update(1, updateDto)).rejects.toThrow(ConflictException);
    });

    it('should throw BadRequestException if ISBN is invalid', async () => {
      const updateDto: UpdateBookDto = { ...createBookDto, isbn: 'invalidisbn' };
      jest.spyOn(service, 'update').mockRejectedValue(new BadRequestException('ISBN não é válido!'));

      await expect(controller.update(1, updateDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove a book if not rented', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      jest.spyOn(service, 'isBookRented').mockResolvedValue(false);

      await expect(controller.remove(1)).resolves.toBe(undefined);
    });

    it('should throw NotFoundException if book not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if book is rented', async () => {
      const errorMessage = `O livro '${bookCreateDataSet.title}' está alugado e não pode ser excluído.`;
      jest.spyOn(service, 'remove').mockRejectedValue(new ConflictException(errorMessage));
      jest.spyOn(service, 'isBookRented').mockResolvedValue(true);

      await expect(controller.remove(bookCreateDataSet.id)).rejects.toThrow(ConflictException);
      await expect(controller.remove(bookCreateDataSet.id)).rejects.toThrow(errorMessage);
    });
  });
});
