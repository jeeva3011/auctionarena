import { Test, TestingModule } from '@nestjs/testing';
import { AuctionResolver } from './auction.resolver';
import { AuctionService } from './auction.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { createAuctionInput, updateAuctionInput, auction } from './test/utils';

describe('AuctionResolver', () => {
  let resolver: AuctionResolver;
  const auctionServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuctionResolver,
        {
          provide: AuctionService,
          useValue: auctionServiceMock,
        },
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

    resolver = module.get<AuctionResolver>(AuctionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create auction', async () => {
    auctionServiceMock.create.mockReturnValueOnce(auction);
    const createAuctionResult =
      await resolver.createAuction(createAuctionInput);

    expect(createAuctionResult).toEqual(auction);
  });

  it('findall auction', async () => {
    auctionServiceMock.findAll.mockReturnValueOnce([auction]);
    const findAllAuctionsResult = await resolver.findAll();

    expect(findAllAuctionsResult).toEqual([auction]);
  });

  it('find auction', async () => {
    const auctionId = 1;
    auctionServiceMock.findOne.mockReturnValueOnce(auction);
    const findAuctionResult = await resolver.findOne(auctionId);

    expect(findAuctionResult).toEqual(auction);
  });

  it('update auction', async () => {
    auctionServiceMock.update.mockReturnValueOnce(true);
    const updateAuctionResult =
      await resolver.updateAuction(updateAuctionInput);

    expect(updateAuctionResult).toBe(true);
  });

  it('should update auction and return true', async () => {
    auctionServiceMock.update.mockReturnValueOnce(true);

    const result = await resolver.updateAuction(updateAuctionInput);

    expect(result).toBe(true);
    expect(auctionServiceMock.update).toHaveBeenCalledWith(
      updateAuctionInput.auctionid,
      updateAuctionInput,
    );
  });

  it('should create auction and return auction', async () => {
    auctionServiceMock.create.mockReturnValueOnce(auction);
    const result = await resolver.createAuction(createAuctionInput);

    expect(result).toBe(auction);
    expect(auctionServiceMock.create).toHaveBeenCalledWith(createAuctionInput);
  });

  it('should find auction with the correct ID', async () => {
    const auctionId = 1;
    auctionServiceMock.findOne.mockReturnValueOnce(auction);
    const result = await resolver.findOne(auctionId);

    expect(result).toBe(auction);
    expect(auctionServiceMock.findOne).toHaveBeenCalledWith(auctionId);
  });

  it('should handle invalid ID gracefully', async () => {
    const invalidAuctionId = 'invalid';
    auctionServiceMock.findOne.mockClear();
    
    const result = await resolver.findOne(invalidAuctionId as any);
    
    expect(result).toBeUndefined();
    expect(auctionServiceMock.findOne).not.toHaveBeenCalledTimes(0);
  });
  
});
