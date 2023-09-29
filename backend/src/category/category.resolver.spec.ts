import { Test, TestingModule } from '@nestjs/testing';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { AuctionResolver } from 'src/auction/auction.resolver';
import { AuctionService } from 'src/auction/auction.service';
import { Auction } from 'src/auction/entities/auction.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import {category, createCategoryInput, updateCategoryInput} from './test/utils'
describe('CategoryResolver', () => {
  let resolver: CategoryResolver;
  const categoryServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  const auctionServiceMock = {
    findOne: jest.fn()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryResolver,
        { provide: CategoryService, useValue: categoryServiceMock },
        {
          provide: getRepositoryToken(Category),
          useValue: {},
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

    resolver = module.get<CategoryResolver>(CategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create category',async () => {
    categoryServiceMock.create.mockReturnValueOnce(category);
    resolver.createCategory(createCategoryInput);
  })

  it('should findall category',async () => {
    const catgry = 'example'
    categoryServiceMock.findAll.mockReturnValueOnce(true);
    resolver.findAllCategory(catgry,category.auctionid);
  })

  it('should find category',async () => {
    const catgry = 'example'
    categoryServiceMock.findOne.mockReturnValueOnce(true);
    resolver.findCategory(catgry);
  })

  it('should update category',async () => {
    categoryServiceMock.update.mockReturnValueOnce(true);
    resolver.updateCategory(updateCategoryInput);
  })

  it('should remove category',async () => {
    categoryServiceMock.remove.mockReturnValueOnce(true);
    resolver.removeCategory(updateCategoryInput.categoryid);
  })



  


});
