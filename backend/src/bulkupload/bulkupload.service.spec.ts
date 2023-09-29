import { Test, TestingModule } from '@nestjs/testing';
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
import { FilehistoryResolver } from 'src/filehistory/filehistory.resolver';
import { User } from 'src/user/entities/user.entity';
import { AwsResolver } from 'src/aws/aws.resolver';
import { PlayersResolver } from 'src/players/players.resolver';
import { AuctionResolver } from 'src/auction/auction.resolver';
import { CategoryResolver } from 'src/category/category.resolver';
describe('BulkuploadService', () => {
  let service: BulkuploadService;
  const auctionServiceMock = {
    findOne: jest.fn(),
  };
  const filehistoryServiceMock = {
    create: jest.fn(),
  };
  const categoryServiceMock = {
    create: jest.fn(),
  };
  const awsServiceMock = {
    readS3File: jest.fn(),
    uploadFile: jest.fn(),
  };
  const playersServiceMock = {
    uploadplayer: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BulkuploadService,
        AwsResolver,
        { provide: AwsService, useValue: awsServiceMock },
        PlayersResolver,
        { provide: PlayersService, useValue: playersServiceMock },
        FilehistoryResolver,
        { provide: FilehistoryService, useValue: filehistoryServiceMock },
        CategoryResolver,
        { provide: CategoryService, useValue: categoryServiceMock },
        LiveGateway,
        {
          provide: getRepositoryToken(Player),
          useValue: {},
        },
        AuctionResolver,
        { provide: AuctionService, useValue: auctionServiceMock },
        TeamService,
        FilehistoryService,
        {
          provide: getRepositoryToken(Filehistory),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Category),
          useValue: {},
        },
        LiveService,
        {
          provide: getRepositoryToken(Auction),
          useValue: {},
        },
        UserService,
        {
          provide: getRepositoryToken(Team),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BulkuploadService>(BulkuploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload valid players', async () => {
    // Mock the behavior of AWS service
    // awsServiceMock.readS3File.mockResolvedValue(/* Provide a valid Excel file buffer here */);
    // awsServiceMock.uploadFile.mockResolvedValue();

    // Prepare a sample input

    const file = 'example.xlsx';
    const auctionid = 1;
    const filename = 'example.xlsx';

    // Call the Excelupload function
    const result = await service.Excelupload(file,auctionid,filename);

    // Assertions
    expect(result).toBe(true);
    // Add more assertions based on your expected behavior
  });

  it('should handle invalid players', async () => {
    // // Mock the behavior of AWS service to return an invalid Excel file buffer
    // awsServiceMock.readS3File.mockResolvedValue(/* Provide an invalid Excel file buffer here */);

    const file = 'example.xlsx';
    const auctionid = 1;
    const filename = 'example.xlsx';

    // Call the Excelupload function
    const result = await service.Excelupload(file,auctionid,filename);

    // Assertions
    expect(result).toBe(false);
    // Add more assertions based on your expected behavior for invalid players
  });
});
