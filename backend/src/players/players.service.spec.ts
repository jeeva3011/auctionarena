import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { AuctionResolver } from 'src/auction/auction.resolver';
import { AuctionService } from 'src/auction/auction.service';
import { Auction } from 'src/auction/entities/auction.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { TeamService } from 'src/team/team.service';
import { Team } from 'src/team/entities/team.entity';
import { CategoryService } from 'src/category/category.service';
import { CategoryResolver } from 'src/category/category.resolver';
import { Category } from 'src/category/entities/category.entity';
import { createPlayerInput, player, updatePlayerInput, updatePlayerStatusInput, uploadplayerInput } from './test/utils';
import { TeamResolver } from 'src/team/team.resolver';
import { updateAuctionInput } from 'src/auction/test/utils';
import { create } from 'domain';
describe('PlayersService', () => {
  let service: PlayersService;
  let repository: any;
  const playerRepoMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  const auctionServiceMock ={
    findOne:jest.fn()
  }
  const categoryServiceMock={
    findOne:jest.fn()
  }
  const teamServiceMock ={
    findOne:jest.fn()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          useValue: playerRepoMock,
        },
        AuctionResolver,
        {
          provide: AuctionService,
          useValue: auctionServiceMock
        },
        {
          provide: getRepositoryToken(Auction),
          useValue:{}
        },
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue:{}
        },
        TeamResolver,
        {
          provide: TeamService,
          useValue: teamServiceMock
        },
        {
          provide: getRepositoryToken(Team),
          useValue: {},
        },
        CategoryResolver,
        {
          provide: CategoryService,
          useValue: categoryServiceMock
        },
        {
          provide:getRepositoryToken(Category),
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    repository= module.get(getRepositoryToken(Player))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create player',async () => {
    auctionServiceMock.findOne.mockReturnValue(createPlayerInput.auctionid);
    categoryServiceMock.findOne.mockReturnValue(createPlayerInput.playerrole);
    playerRepoMock.save.mockReturnValueOnce(player);
    await service.create(createPlayerInput)
  });

  it('should update player team', async ()=>{
    auctionServiceMock.findOne.mockReturnValue(updatePlayerStatusInput.auctionid);
    teamServiceMock.findOne.mockReturnValue(updatePlayerStatusInput.teamid);
    playerRepoMock.save.mockReturnValueOnce(true);
  })
  it('should find all players for an auction', async () => {
    const auctionId = 1;
    playerRepoMock.find.mockReturnValueOnce(player);

    const result = await service.findAllPlayers(auctionId);

    expect(result).toEqual(player);
    expect(playerRepoMock.find).toHaveBeenCalledWith({ where: { auctionid: auctionId } });
  });
  
  it('should find a player by mobile and auction ID', async () => {  
    playerRepoMock.findOne.mockReturnValueOnce(player);
    const result = await service.findOne(player.playermobile, player.auctionid);

    expect(result).toBe(true);
    expect(playerRepoMock.findOne).toHaveBeenCalledWith({ where: { playermobile: player.playermobile, auctionid: player.auctionid } });
  });

  it('should return false when player not found', async () => {   
    playerRepoMock.findOne.mockReturnValueOnce(null);
    const result = await service.findOne(player.playermobile, player.auctionid);

    expect(result).toBe(false);
    expect(playerRepoMock.findOne).toHaveBeenCalledWith({ where: { playermobile: player.playermobile, auctionid: player.auctionid } });
  });

  it('should upload player',async () => {
    auctionServiceMock.findOne.mockReturnValue(createPlayerInput.auctionid);
    categoryServiceMock.findOne.mockReturnValue(createPlayerInput.playerrole);
    playerRepoMock.save.mockReturnValueOnce(player);
    await service.uploadplayer(uploadplayerInput,createPlayerInput.auctionid)
  });

  
  it('should remove a player by ID', async () => {    
    playerRepoMock.find.mockReturnValueOnce([player]);

    const result = await service.remove(player.playerid);

    expect(result).toBe(true);
    expect(playerRepoMock.find).toHaveBeenCalledWith({ where: { playerid: player.playerid } });
    expect(playerRepoMock.remove).toHaveBeenCalledWith([player]);
  });

  it('should throw an error when player ID not found', async () => {  
    playerRepoMock.find.mockReturnValueOnce([]);

    try {
      await service.remove(player.playerid);
    } catch (error) {
      expect(error.message).toBe('Id not Found');
    }

    expect(playerRepoMock.find).toHaveBeenCalledWith({ where: { playerid: player.playerid } });
    expect(playerRepoMock.remove).not.toHaveBeenCalledTimes(0);
  });

  it('should update a player by ID', async () => {
    playerRepoMock.update.mockReturnValueOnce({ affected: 1 });
    const result = await service.update(updatePlayerInput.playerid, updatePlayerInput);

    expect(result).toBe(true);
    expect(playerRepoMock.update).toHaveBeenCalledWith(updatePlayerInput.playerid, updatePlayerInput);
  });

  
  it('should return false when player ID is not found', async () => {
    playerRepoMock.update.mockReturnValueOnce({ affected: 0 });

    const result = await service.update(updatePlayerInput.playerid, updatePlayerInput);

    expect(result).toBe(false);
    expect(playerRepoMock.update).toHaveBeenCalledWith(updatePlayerInput.playerid, updatePlayerInput);
  });


  
  
});
