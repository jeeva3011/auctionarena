import { Test, TestingModule } from '@nestjs/testing';
import { PlayersResolver } from './players.resolver';
import { PlayersService } from './players.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { AuctionService } from 'src/auction/auction.service';
import { AuctionResolver } from 'src/auction/auction.resolver';
import { Auction } from 'src/auction/entities/auction.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { TeamService } from 'src/team/team.service';
import { Team } from 'src/team/entities/team.entity';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { createPlayerInput, player, updatePlayerInput, updatePlayerStatusInput } from './test/utils';

describe('PlayersResolver', () => {
  let resolver: PlayersResolver;
  const playersServiceMock={
    create: jest.fn(),
    transferPlayer: jest.fn(),
    findAllPlayers: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    removePlayerCategory: jest.fn(),
    updateTeam: jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersResolver, {provide:PlayersService,
      useValue: playersServiceMock},{
        provide: getRepositoryToken(Player),
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
      },
      TeamService,
      {
        provide: getRepositoryToken(Team),
        useValue: {},
      },
      CategoryService,
      {
        provide:getRepositoryToken(Category),
        useValue: {}
      }],
    }).compile();

    resolver = module.get<PlayersResolver>(PlayersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should create player',async () => {
    playersServiceMock.create.mockReturnValueOnce(true);
    resolver.createPlayer(createPlayerInput);
  })
  it('should transfer player',async () => {
    playersServiceMock.transferPlayer.mockReturnValueOnce(true);
    resolver.transferPlayer(12,21);
  })
  it('should findall players',async () => {
    playersServiceMock.findAllPlayers.mockReturnValueOnce(player);
    resolver.findAllPlayers(12);
  })

  it('should find One',async () => {
    playersServiceMock.findOne.mockReturnValueOnce(player);
    resolver.findOne('1242920',11);
  })

  it('should update',async () => {
    playersServiceMock.update.mockReturnValueOnce(true);
    resolver.updatePlayer(updatePlayerInput);
  })

  it('should remove player',async () => {
    playersServiceMock.remove.mockReturnValueOnce(true);
    resolver.removePlayer(12);
  })

  it('should remove player category',async () => {
    playersServiceMock.removePlayerCategory.mockReturnValueOnce(true);
    resolver.removePlayerCategory(12);
  })

  it('should update player status',async () => {
    playersServiceMock.updateTeam.mockReturnValueOnce(true);
    resolver.updatePlayerStatus(updatePlayerStatusInput)
  })
});
