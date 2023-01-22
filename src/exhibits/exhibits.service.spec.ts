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
    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Exhibit width ID: 999');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a exhibition', () => {
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Exhibit width ID: 999');
      }
    });
  });

  describe('create', () => {
    it('should create a exhibition', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: '이집트2',
        startDate: 2023,
        endDate: 2024,
        location: ['서울', '예술의 전당'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a exhibition', () => {
      service.update(1, { title: 'Updated Test' });
      const exhibition = service.getOne(1);
      expect(exhibition.title).toEqual('Updated Test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found Exhibit width ID: 999');
      }
    });
  });
});
