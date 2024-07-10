import { Test, TestingModule } from "@nestjs/testing";
import { RenterController } from "../renter.controller";
import { RenterService } from "../renter.service";
import { RenterDto } from "../dtos/renter.dto";
import { CreateRenterDto } from "../dtos/create-renter.dto";
import { UpdateRenterDto } from "../dtos/update-renter.dto";
import { NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { createRenterDtoSet, renterCreateDataSet } from "./test-data/test-data.renter";
import { RentalService } from "src/modules/rental/rental.service";

describe('RenterController', () => {
  let controller: RenterController;
  let service: RenterService;
  let rentalService: RentalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RenterController],
      providers: [
        {
          provide: RenterService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: RentalService,
          useValue: {
            hasBooksToReturn: jest.fn(),
          },
        }
      ],
    }).compile();

    controller = module.get<RenterController>(RenterController);
    service = module.get<RenterService>(RenterService);
    rentalService = module.get<RentalService>(RentalService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of renters', async () => {
      const result: RenterDto[] = [renterCreateDataSet];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single renter', async () => {
      const result: RenterDto = renterCreateDataSet;
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException if renter not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new renter', async () => {
      const createDto: CreateRenterDto = createRenterDtoSet;
      const result: RenterDto = renterCreateDataSet;
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createDto)).toBe(result);
    });

    it('should throw BadRequestException if missing required fields', async () => {
      const createDto: CreateRenterDto = { ...createRenterDtoSet, name: undefined };
      jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

      await expect(controller.create(createDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a renter', async () => {
      const updateDto: UpdateRenterDto = createRenterDtoSet;
      const result: RenterDto = renterCreateDataSet;
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(1, updateDto)).toBe(result);
    });

    it('should throw NotFoundException if renter not found', async () => {
      const updateDto: UpdateRenterDto = createRenterDtoSet;
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(controller.update(999, updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a renter', async () => {
      jest.spyOn(rentalService, 'hasBooksToReturn').mockResolvedValue(false);
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await controller.remove(1)).toBe(undefined);
    });

    it('should throw NotFoundException if renter not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if renter has books to return', async () => {
      jest.spyOn(rentalService, 'hasBooksToReturn').mockResolvedValue(true);
      jest.spyOn(service, 'remove').mockRejectedValue(new ConflictException());

      await expect(controller.remove(1)).rejects.toThrow(ConflictException);
    });
  });
});
