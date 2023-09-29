import { Test, TestingModule } from '@nestjs/testing';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { AuctionResolver } from 'src/auction/auction.resolver';
import { AuctionService } from 'src/auction/auction.service';
import { Auction } from 'src/auction/entities/auction.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { createTeamInput, team, updateTeam } from './test/utils';

describe('TeamResolver', () => {
  let resolver: TeamResolver;
  const teamServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    transferTeam: jest.fn(),
    updateTeamPoints: jest.fn(),
    remove: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamResolver,
        { provide: TeamService, useValue: teamServiceMock },
        {
          provide: getRepositoryToken(Team),
          useValue: {},
        },
        AuctionResolver,
        AuctionService,
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

    resolver = module.get<TeamResolver>(TeamResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create team', async () => {
    teamServiceMock.create.mockReturnValueOnce(team);
    resolver.createTeam(createTeamInput);
  });

  it('should findAll',async () => {
    teamServiceMock.findAll.mockReturnValueOnce(team);
    resolver.findAll()
  })

  it('should findOne',async () => {
    teamServiceMock.findOne.mockReturnValueOnce(team);
    resolver.findOne(12);
  })

  it('should update Team',async () => {
    teamServiceMock.update.mockReturnValueOnce(true);
    resolver.updateTeam(updateTeam)
  })

  it('should transfer team',async () => {
    teamServiceMock.transferTeam.mockReturnValueOnce(true);
    resolver.transferTeam(12,21);
  })

  it('should update team points',async () => {
    teamServiceMock.updateTeamPoints.mockReturnValueOnce(true);
    resolver.updateTeamPoints({teamid: 12, teampoints:2, auctionid:2})
  })

  it('should remove team',async () => {
    teamServiceMock.remove.mockReturnValueOnce(true)
    resolver.removeTeam(12);
  })
});
