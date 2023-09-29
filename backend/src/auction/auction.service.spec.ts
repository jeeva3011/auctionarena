import { Test, TestingModule } from '@nestjs/testing';
import { AuctionService } from './auction.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { UserService } from 'src/user/user.service';
import { UserResolver } from 'src/user/user.resolver';
import { User } from 'src/user/entities/user.entity';
import { createAuctionInput, user, auction, updateAuctionInput } from './test/utils';

describe('AuctionService', () => {
  let service: AuctionService;
  let auctionRepoMock: Record<string, jest.Mock>;
  let userServiceMock: Record<string, jest.Mock>;

  beforeEach(async () => {
    auctionRepoMock = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
    };

    userServiceMock = {
      findOne: jest.fn().mockReturnValueOnce({ ...user, auction: [] }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuctionService,
        {
          provide: getRepositoryToken(Auction),
          useValue: auctionRepoMock,
        },
        UserResolver,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuctionService>(AuctionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create', async () => {
    const userWithAuction = { ...user, auction: [] }; // Include an empty auction array
    userServiceMock.findOne.mockReturnValueOnce(userWithAuction);
    auctionRepoMock.save.mockReturnValueOnce(auction);
  
    await service.create(createAuctionInput);
  
    expect(auctionRepoMock.save).toHaveBeenCalledWith({
      user: userWithAuction, // Provide the user with auction property
      ...createAuctionInput,
      image: createAuctionInput.image === '' ? null : createAuctionInput.image,
    });
  });

  it('should findall auction', async ()=>{
    auctionRepoMock.findAll.mockReturnValueOnce(auction);
    service.findAll();
  });

  it('should findone auction', async ()=>{
    auctionRepoMock.findOne.mockReturnValueOnce(auction);
    service.findOne(1);
  });

  it('should update',async () => {
    auctionRepoMock.update.mockReturnValueOnce({
      raw: {},
      affected: 1,
      generatedMaps: []
    })
    await service.update(updateAuctionInput.auctionid,updateAuctionInput);
  });

});
