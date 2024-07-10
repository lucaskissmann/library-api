import { Test, TestingModule } from "@nestjs/testing";
import { RentalController } from "../rental.controller";
import { RentalService } from "../rental.service";
import { RentalDto } from "../dtos/rental.dto";
import { CreateRentalDto } from "../dtos/create-rental.dto";
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { createRentalDtoSet, rentalCreateDataSet } from "./test-data/test-data.rental";

describe('RentalController', () => {
  let controller: RentalController;
  let service: RentalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalController],
      providers: [
        {
          provide: RentalService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            returnBooks: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RentalController>(RentalController);
    service = module.get<RentalService>(RentalService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of rentals', async () => {
      const result: RentalDto[] = [rentalCreateDataSet];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single rental', async () => {
      const result: RentalDto = rentalCreateDataSet;
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException if rental not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new rental', async () => {
      const createDto: CreateRentalDto = createRentalDtoSet;
      const result: RentalDto = rentalCreateDataSet;
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createDto)).toBe(result);
    });

    it('should throw BadRequestException if missing required fields', async () => {
      const createDto: CreateRentalDto = { ...createRentalDtoSet, bookIds: undefined };
      jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

      await expect(controller.create(createDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('returnBooks', () => {
    it('should return all books present in rental', async () => {
      jest.spyOn(service, 'returnBooks').mockResolvedValue(rentalCreateDataSet);

      const result = await controller.returnBooks(1); 
      expect(result).toBe(rentalCreateDataSet);
    });

    it('should handle NotFound exception if rental not found', async () => {
      jest.spyOn(service, 'returnBooks').mockRejectedValue(new NotFoundException());

      await expect(controller.returnBooks(999)).rejects.toThrow(NotFoundException);
    });
  });
});
