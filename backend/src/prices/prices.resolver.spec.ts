import { Test, TestingModule } from '@nestjs/testing';
import { PricesResolver } from './prices.resolver';
import { PricesService } from './prices.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { price } from './test/utils';

describe('PricesResolver', () => {
  let resolver: PricesResolver;
  const priceServiceMock = {
    create: jest.fn(),
    getAllPrice: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PricesResolver,
        {
          provide: PricesService,
          useValue: priceServiceMock,
        },
        {
          provide: getRepositoryToken(Price),
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<PricesResolver>(PricesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create',async () => {
    priceServiceMock.create.mockReturnValueOnce(price);
    const {id , ...newprice}=price;
    resolver.createPrice(newprice);
  })
  
  it('should getall Price',async () => {
    priceServiceMock.getAllPrice.mockReturnValueOnce(price);
    resolver.getAllPrice();
  })

});
