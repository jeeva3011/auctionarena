import { Test, TestingModule } from '@nestjs/testing';
import { FilehistoryService } from './filehistory.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Filehistory } from './entities/filehistory.entity';
import { AuctionResolver } from 'src/auction/auction.resolver';
import { AuctionService } from 'src/auction/auction.service';
import { Auction } from 'src/auction/entities/auction.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

describe('FilehistoryService', () => {
  let service: FilehistoryService;
  let repository: any;
  const filehistoryRepoMock = {
    save: jest.fn(),
    findOne: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilehistoryService,
        {
          provide: getRepositoryToken(Filehistory),
          useValue: filehistoryRepoMock,
        },
        AuctionResolver,
        AuctionService,
        {
          provide: getRepositoryToken(Auction),
          useValue:{}
        },
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue:{}
        }

      ],
    }).compile();

    service = module.get<FilehistoryService>(FilehistoryService);
    repository = module.get(getRepositoryToken(Filehistory));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
