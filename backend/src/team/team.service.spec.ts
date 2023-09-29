import { Test, TestingModule } from '@nestjs/testing';
import { TeamService } from './team.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { AuctionResolver } from 'src/auction/auction.resolver';
import { AuctionService } from 'src/auction/auction.service';
import { Auction } from 'src/auction/entities/auction.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { auctionData, createTeamInput, team, updateTeam } from './test/utils';

describe('TeamService', () => {
  let service: TeamService;
  let repository: any;
  const mockTeamRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  const auctionServiceMock={
    findOne: jest.fn()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: getRepositoryToken(Team),
          useValue: mockTeamRepository,
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
        }
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
    repository = module.get(getRepositoryToken(Team));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create',async () => {
    auctionServiceMock.findOne.mockReturnValue(auctionData);
    mockTeamRepository.save.mockReturnValueOnce(team);
    await service.create(createTeamInput)
  });
   it('should create without image',async () => {
    auctionServiceMock.findOne.mockReturnValue(auctionData);
    mockTeamRepository.save.mockReturnValueOnce(team);
    const {image,...createTeamInputs}= createTeamInput;
    await service.create({...createTeamInputs, image:""})
  })

  it('should transfer team',async () => {
    auctionServiceMock.findOne.mockReturnValueOnce(auctionData);
    mockTeamRepository.findOne.mockReturnValueOnce(team);
    mockTeamRepository.save.mockReturnValueOnce(team);
    await service.transferTeam(12,21);
  })
  it('should find all',async()=>{
    mockTeamRepository.find.mockReturnValueOnce(team);
    service.findAll();
  })

  it('should find one',async () => {
    mockTeamRepository.findOne.mockReturnValueOnce(team);
    service.findOne(12);
  })
  it('should update',async () => {
    mockTeamRepository.update.mockReturnValueOnce({
      raw: {},
      affected: 1,
      generatedMaps: []
    })
    await service.update(updateTeam.teamid,updateTeam);
  })

  it('should update team points',async () => {
    mockTeamRepository.update.mockReturnValueOnce({
      raw: {},
      affected: 1,
      generatedMaps: []
    })
    await service.updateTeamPoints({teamid: 12, teampoints:2, auctionid:2})
  })

  it('should remove',async () => {
    mockTeamRepository.find.mockReturnValueOnce(team);
    mockTeamRepository.remove.mockResolvedValueOnce(team);
    await service.remove(12);
    mockTeamRepository.find.mockReset()
   })

  it('should handle catch',async ()=>{
    mockTeamRepository.find.mockRejectedValueOnce(new Error('team not found'));
    await service.remove(12);
  })
  it('should handle when record not found',async () => {
    await service.remove(12);
  })
});
