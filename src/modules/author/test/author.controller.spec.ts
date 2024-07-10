import { Test, TestingModule } from "@nestjs/testing";
import { AuthorController } from "../author.controller";
import { AuthorService } from "../author.service";
import { AuthorDto } from "../dtos/author.dto";
import { BookDto } from "src/modules/book/dtos/book.dto";
import { CreateAuthorDto } from "../dtos/create-author.dto";
import { UpdateAuthorDto } from "../dtos/update-author.dto";
import { authorCreateDataSet, createAuthorDtoSet } from "./test-data/test-data.author";
import { bookCreateDataSet } from "src/modules/book/test/test-data/test-data.book";
import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";

describe('AuthorController', () => {
    let controller: AuthorController;
    let service: AuthorService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthorController],
        providers: [
          {
            provide: AuthorService,
            useValue: {
              findAll: jest.fn(),
              findOne: jest.fn(),
              findBooksByAuthor: jest.fn((id: number) => {
                return [bookCreateDataSet];
              }),
              create: jest.fn(),
              update: jest.fn(),
              remove: jest.fn((id: number) => {
                return new Promise<void>((resolve, reject) => {
                  if (id === 1) {
                    reject(new ConflictException(`O Autor ${authorCreateDataSet.name} não pode ser removido pois possui livros associados a ele`));
                  } else {
                    resolve();
                  }
                });
              }),
            },
          },
        ],
      }).compile();
  
      controller = module.get<AuthorController>(AuthorController);
      service = module.get<AuthorService>(AuthorService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of authors', async () => {
            const result: AuthorDto[] = [authorCreateDataSet];
            jest.spyOn(service, 'findAll').mockResolvedValue(result);

            expect(await controller.findAll()).toBe(result);
        });
    });
    
    describe('findOne', () => {
        it('should return a single author', async () => {
            const result: AuthorDto = authorCreateDataSet;
            jest.spyOn(service, 'findOne').mockResolvedValue(result);

            expect(await controller.findOne(1)).toBe(result);
        });

        it('should throw NotFoundException if author not found', async () => {
            jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());
        
            await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });
    
    describe('findBooksByAuthor', () => {
        it('should return an array of books by the author', async () => {
            const result: BookDto[] = [bookCreateDataSet];
            jest.spyOn(service, 'findBooksByAuthor').mockResolvedValue(result);

            expect(await controller.findBooksByAuthor(1)).toBe(result);
        });
    });
    
    describe('create', () => {
        it('should create a new author', async () => {
            const createDto: CreateAuthorDto = createAuthorDtoSet;
            const result: AuthorDto = authorCreateDataSet;
            jest.spyOn(service, 'create').mockResolvedValue(result);

            expect(await controller.create(createDto)).toBe(result);
        });

        it('should throw BadRequestException if missing required fields', async () => {
            const createDto: CreateAuthorDto = { ...createAuthorDtoSet, name: undefined };
            jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());
      
            await expect(controller.create(createDto)).rejects.toThrow(BadRequestException);
        });

        it('should throw ConflictException if CPF already exists', async () => {
          const createDto: CreateAuthorDto = { ...createAuthorDtoSet, cpf: '12345678901' };
          jest.spyOn(service, 'create').mockRejectedValue(new ConflictException(`Já existe um autor cadastrado para o CPF ${createDto.cpf}`));
    
          await expect(controller.create(createDto)).rejects.toThrow(ConflictException);
      });
    });
    
    describe('update', () => {
        it('should update an author', async () => {
            const updateDto: UpdateAuthorDto = createAuthorDtoSet;
            const result: AuthorDto = authorCreateDataSet;
            jest.spyOn(service, 'update').mockResolvedValue(result);

            expect(await controller.update(1, updateDto)).toBe(result);
        });

        it('should throw NotFoundException if author not found', async () => {
            const updateDto: UpdateAuthorDto = createAuthorDtoSet;
            jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());
      
            await expect(controller.update(999, updateDto)).rejects.toThrow(NotFoundException);
        });

        it('should throw ConflictException if CPF already exists', async () => {
          const updateDto: UpdateAuthorDto = { ...createAuthorDtoSet, cpf: '12345678901' };
          jest.spyOn(service, 'update').mockRejectedValue(new ConflictException(`Já existe um autor cadastrado para o CPF ${updateDto.cpf}`));
    
          await expect(controller.update(1, updateDto)).rejects.toThrow(ConflictException);
      });
    });
    
    describe('remove', () => {
        it('should remove an author', async () => {
            jest.spyOn(service, 'remove').mockResolvedValue(undefined);
            jest.spyOn(service, 'findBooksByAuthor').mockResolvedValue([]);

            expect(await controller.remove(1)).toBe(undefined);
        });

        it('should throw ConflictException if author is linked to books', async () => {
            const authorId = 1;
            jest.spyOn(service, 'findBooksByAuthor').mockResolvedValue([bookCreateDataSet]);
      
            await expect(controller.remove(authorId)).rejects.toThrow(ConflictException);
          });
    });
});