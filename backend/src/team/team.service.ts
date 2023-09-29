import { Injectable } from '@nestjs/common';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { AuctionService } from 'src/auction/auction.service';
import { promises } from 'dns';
import { UpdateTeamPointsInput } from './dto/update-team_points.input';

@Injectable()
export class TeamService {

  constructor(@InjectRepository(Team) private teamRepo: Repository<Team>,
            private auctionService : AuctionService){}

  public async create(createTeamInput: CreateTeamInput) {
    const auction = await this.auctionService.findOne(createTeamInput.auctionid)
    return this.teamRepo.save({
      auction:auction,
      auctionid: createTeamInput.auctionid,
      teamname: createTeamInput.teamname,
      shortname:createTeamInput.shortname,
      shortcutkey: createTeamInput.shortcutkey,
      teampoints: auction.pointsperteam,
      image:createTeamInput.image===""?null:createTeamInput.image
    })
  }

  public async transferTeam(auctionid:number,teamid:number){
    const auction = await this.auctionService.findOne(auctionid)
    const teams = await this.teamRepo.findOne({where:{teamid:teamid}})
    const team = await this.teamRepo.save({
      auction:auction,
      auctionid:auctionid,
      teampoints: auction.pointsperteam,
      teamid:teamid,
      players:teams.players
    })

    return !!team
  }

  findAll() {
    return this.teamRepo.find();
  }

  findOne(id: number) {
    return this.teamRepo.findOne({where:{teamid:id}})
  }

  public async update(id: number, updateTeamInput: UpdateTeamInput) {
    return (await this.teamRepo.update(id,updateTeamInput)).affected>0
  }

  public async updateTeamPoints(updateTeamPointsInput:UpdateTeamPointsInput): Promise<Boolean>{
    return (await this.teamRepo.update(updateTeamPointsInput.teamid,updateTeamPointsInput)).affected>0
  }

  public async remove(id: number): Promise<Boolean> {
    try {
      const record = await this.teamRepo.find({ where: { teamid: id } });
      if (!record) {
        throw new Error('Record not found');
      }
      await this.teamRepo.remove(record);
      return true;
    } catch (error) {
      return false;
    }
  }
}
