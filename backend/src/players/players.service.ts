import { Injectable } from '@nestjs/common';
import { CreatePlayerInput } from './dto/create-player.input';
import { UpdatePlayerInput } from './dto/update-player.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { AuctionService } from 'src/auction/auction.service';
import { TeamService } from 'src/team/team.service';
import { UpdatePlayerStatusInput } from './dto/update-player-status.input';
import { Team } from 'src/team/entities/team.entity';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { CreateBulkuploadInput } from 'src/bulkupload/dto/create-bulkupload.input';

@Injectable()
export class PlayersService {

  constructor(@InjectRepository(Player) private playerRepo : Repository<Player>,
              private auctionService : AuctionService,
              private categoryService : CategoryService,
              private teamService: TeamService
              ){}

  
  public async create(createPlayerInput: CreatePlayerInput) {
    const auction = await this.auctionService.findOne(createPlayerInput.auctionid)
    const category = await this.categoryService.findOne(createPlayerInput.playerrole)
   
    const newPlayer =  this.playerRepo.save({
      auction:auction,
      auctionid:createPlayerInput.auctionid,
      playername: createPlayerInput.playername,
      playermobile: createPlayerInput.playermobile,
      playerdob: createPlayerInput.playerdob,
      playerrole: createPlayerInput.playerrole,
      category: category,
      tshirtsize: createPlayerInput.tshirtsize,
      trousersize: createPlayerInput.trousersize,
      status:createPlayerInput.status,
      notes: createPlayerInput.notes===""?null:createPlayerInput.notes,
      playerimage:createPlayerInput.playerimage===""?null:createPlayerInput.playerimage
    })

    return !!newPlayer;
  }

  public async transferPlayer(auctionid:number,playerid:number){
    const auction = await this.auctionService.findOne(auctionid)
    const player = await this.playerRepo.save({
      auction:auction,
      auctionid:auctionid,
      status:"available",
      teamid:null,
      playerid:playerid,
      teams:null
    })
    return !!player;
  }

  public async findAllPlayers(auctionId: number) {
    return this.playerRepo.find({ where: { auctionid: auctionId } });
  }

  public async findOne(playermobile: string, autionid: number):Promise<Boolean> {
     const data = await this.playerRepo.findOne({where:{playermobile:playermobile, auctionid:autionid}});
     if(!data){
      return false;
     }
     return true;
  }

  public async update(id: number, updatePlayerInput: UpdatePlayerInput):Promise<Boolean> {
    return (await this.playerRepo.update(id,updatePlayerInput)).affected>0
  }

  public async updateTeam(updatePlayerStatus:UpdatePlayerStatusInput):Promise<Boolean>{
    const auction = await this.auctionService.findOne(updatePlayerStatus.auctionid)
    const team = await this.teamService.findOne(updatePlayerStatus.teamid)
    if (!auction || !team) {
      return false;
    }
    const teams = await this.playerRepo.save({
      auction:auction,
      teams:team,
      auctionid:updatePlayerStatus.auctionid,
      status:updatePlayerStatus.status,
      teamid:updatePlayerStatus.teamid,
      playerid:updatePlayerStatus.playerid
    })
    return !!teams
  }


  public async remove(id: number): Promise<Boolean> {
      const record = await this.playerRepo.find({ where: { playerid: id } });
      if (record.length !== 0) {
        await this.playerRepo.remove(record);
        return true;       
      }else{
        throw Error('Id not Found');
      }
  }

  public async removePlayerCategory(id: number): Promise<Boolean> {
    try {
      const records = await this.playerRepo.find({ relations: ['category'] });
      const filteredRecords = records.filter((record) => record?.category?.categoryid === id);
      await this.playerRepo.remove(filteredRecords);
      return true;
    } catch (error) {
      console.error('Error deleting record:', error);
      return false;
    }    
  }

  public async uploadplayer(player: CreateBulkuploadInput, auctionid:number){
    
    const auction = await this.auctionService.findOne(auctionid)
    const category = await this.categoryService.findOne(player.playerrole)
    return this.playerRepo.save({
      playername: player.playername,
      playermobile: player.playermobile+"",
      auctionid: auctionid,
      auction,
      category: category,
      playerdob: new Date(player.playerdob),
      tshirtsize: player.tshirtsize,
      trousersize:player.trousersize,
      playerrole: player.playerrole,
      status:"available"
    }
    );
  }

  
}
