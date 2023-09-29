import { Test, TestingModule } from '@nestjs/testing';
import { PricesService } from './prices.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { price } from './test/utils';

describe('PricesService', () => {
  let service: PricesService;
  let repository: any;
  const priceRepoMock={
    save: jest.fn(),
    find: jest.fn()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PricesService,{
        provide: getRepositoryToken(Price),
        useValue:priceRepoMock
      }
    ],
    }).compile();

    service = module.get<PricesService>(PricesService);
    repository= module.get(getRepositoryToken(Price))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create',async () => {
    priceRepoMock.save.mockReturnValueOnce(price);
    await service.create(price)
  })

  it('should get all price',async () => {
    priceRepoMock.find.mockReturnValueOnce(price);
    await service.getAllPrice();
  })
});
