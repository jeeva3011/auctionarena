import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { AuctionResolver } from 'src/auction/auction.resolver';
import { AuctionService } from 'src/auction/auction.service';
import { Auction } from 'src/auction/entities/auction.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import {
  createCategoryInput,
  category,
  updateCategoryInput,
} from './test/utils';
describe('CategoryService', () => {
  let service: CategoryService;
  let repository: any;
  const categoryRepoMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  const auctionServiceMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: categoryRepoMock,
        },
        AuctionResolver,
        { provide: AuctionService, useValue: auctionServiceMock },
        {
          provide: getRepositoryToken(Auction),
          useValue: {},
        },
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create category', async () => {
    auctionServiceMock.findOne.mockReturnValue(createCategoryInput.auctionid);
    categoryRepoMock.save.mockReturnValueOnce(category);
  });

  describe('findAll', () => {
    it('should return true when category is found', async () => {
      const category = 'Test Category';
      const auctionid = 1;

      categoryRepoMock.findOne.mockReturnValueOnce(category);
      const result = await service.findAll(category, auctionid);
      expect(categoryRepoMock.findOne).toHaveBeenCalledWith({
        where: { category, auctionid },
      });
      expect(result).toBe(true);
    });

    it('should return false when category is not found', async () => {
      const category = 'Non-Existent Category';
      const auctionid = 2;

      categoryRepoMock.findOne.mockReturnValueOnce(null);
      const result = await service.findAll(category, auctionid);
      expect(categoryRepoMock.findOne).toHaveBeenCalledWith({
        where: { category, auctionid },
      });
      expect(result).toBe(false);
    });
  });

    it('should find one category',async () => {
      categoryRepoMock.findOne.mockReturnValueOnce(category.category);
      const result = await service.findOne(category.category);
      expect(categoryRepoMock.findOne).toHaveBeenCalledWith({
        where: { category:category.category},
      });
      expect(result).toBe(category.category);

    })

    describe('update', () => {
      it('should return true when the category is updated successfully', async () => {
              categoryRepoMock.update.mockReturnValueOnce({ affected: 1 });
  
        const result = await service.update(updateCategoryInput.categoryid, updateCategoryInput);
  
        expect(categoryRepoMock.update).toHaveBeenCalledWith(updateCategoryInput.categoryid, updateCategoryInput);
        expect(result).toBe(true);
      });
  
      it('should return false when the category update affects 0 rows', async () => {
        categoryRepoMock.update.mockReturnValueOnce({ affected: 0 });
  
        const result = await service.update(updateCategoryInput.categoryid, updateCategoryInput);
  
        expect(categoryRepoMock.update).toHaveBeenCalledWith(updateCategoryInput.categoryid, updateCategoryInput);
        expect(result).toBe(false);
      });
    });

    describe('remove', () => {
      it('should return true when the category is removed successfully', async () => {
        const id = category.categoryid; 
  
        categoryRepoMock.find.mockReturnValueOnce(category);
  
        const result = await service.remove(id);
  
        expect(categoryRepoMock.find).toHaveBeenCalledWith({ where: { categoryid: id } });
        expect(categoryRepoMock.remove).toHaveBeenCalledWith(category);
        expect(result).toBe(true);
      });
  
      it('should return false when the category is not found', async () => {
        const id = category.categoryid; 
        categoryRepoMock.find.mockReturnValueOnce(undefined);
  
        const result = await service.remove(id);
  
        expect(categoryRepoMock.find).toHaveBeenCalledWith({ where: { categoryid: id } });
        expect(categoryRepoMock.remove).not.toHaveBeenCalledTimes(0);
        expect(result).toBe(false);
      });
    });
  
});
