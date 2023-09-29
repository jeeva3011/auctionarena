import { Test, TestingModule } from '@nestjs/testing';
import { BulkuploadResolver } from './bulkupload.resolver';
import { BulkuploadService } from './bulkupload.service';
import { AwsService } from 'src/aws/aws.service';
import { PlayersService } from 'src/players/players.service';
import { FilehistoryService } from 'src/filehistory/filehistory.service';
import { CategoryService } from 'src/category/category.service';
import { LiveGateway } from 'src/live/live.gateway';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { AuctionService } from 'src/auction/auction.service';
import { TeamService } from 'src/team/team.service';
import { Filehistory } from 'src/filehistory/entities/filehistory.entity';
import { Category } from 'src/category/entities/category.entity';
import { LiveService } from 'src/live/live.service';
import { Auction } from 'src/auction/entities/auction.entity';
import { UserService } from 'src/user/user.service';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';

describe('BulkuploadResolver', () => {
  let resolver: BulkuploadResolver;
  const bulkuploadServiceMock = {
    Excelupload: jest.fn()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BulkuploadResolver,
        {provide:BulkuploadService, useValue:bulkuploadServiceMock},
        AwsService,
        PlayersService,
        FilehistoryService,
        CategoryService,
        LiveGateway,
        {
          provide: getRepositoryToken(Player),
          useValue: {},
        },
        AuctionService,
        TeamService,
        FilehistoryService,
        {
          provide: getRepositoryToken(Filehistory),
          useValue: {}
        },
        {
          provide: getRepositoryToken(Category),
          useValue: {}
        },
        LiveService,
        {
          provide: getRepositoryToken(Auction),
          useValue: {}
        },
        UserService,
        {
          provide: getRepositoryToken(Team),
          useValue: {}
        },
        {
          provide: getRepositoryToken(User),
          useValue: {}
        }
      ],
    }).compile();

    resolver = module.get<BulkuploadResolver>(BulkuploadResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should upload excel',async ()=>{
    const file = "some file";
    const auctionid = 1;
    const filename = 'filename.xlsx';
    bulkuploadServiceMock.Excelupload.mockReturnValueOnce(true)
    resolver.Excelupload(file,auctionid,filename)
  })
});
