import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExhibitsService } from './exhibits.service';

describe('ExhibitsService', () => {
  let service: ExhibitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExhibitsService],
    }).compile();

    service = module.get<ExhibitsService>(ExhibitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a exhibition', () => {
      const exhibition = service.getOne(1);
      expect(exhibition).toBeDefined();
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Exhibit width ID: 999');
      }
    });
  });
});
