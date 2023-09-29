import { Test, TestingModule } from '@nestjs/testing';
import { FilehistoryResolver } from './filehistory.resolver';
import { FilehistoryService } from './filehistory.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Filehistory } from './entities/filehistory.entity';
import { AuctionResolver } from 'src/auction/auction.resolver';
import { AuctionService } from 'src/auction/auction.service';
import { Auction } from 'src/auction/entities/auction.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

describe('FilehistoryResolver', () => {
  let resolver: FilehistoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilehistoryResolver, FilehistoryService,        {
        provide: getRepositoryToken(Filehistory),
        useValue: {},
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
      }],
    }).compile();

    resolver = module.get<FilehistoryResolver>(FilehistoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
