import { Injectable } from '@nestjs/common';
import { CreateAuctionInput } from './dto/create-auction.input';
import { UpdateAuctionInput } from './dto/update-auction.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuctionService {

  constructor(@InjectRepository(Auction) private auctionRepo: Repository<Auction>,
              private userService:UserService,){}

  public async create(createAuctionInput: CreateAuctionInput) {
    const { userid, auctionname } = createAuctionInput;
    const user = await this.userService.findOne(userid);
    if (!user) {
      throw new Error('User not found');
    }
    const existingAuction = user.auction.find((auction) => auction.auctionname === auctionname);

    if (existingAuction) {
      throw new Error('Auction name already exists for the same user');
    }

    return  this.auctionRepo.save({
      user,
      userid: createAuctionInput.userid,
      auctionname: createAuctionInput.auctionname,
      auctiontype: createAuctionInput.auctiontype,
      auctiondate: createAuctionInput.auctiondate,
      pointsperteam: createAuctionInput.pointsperteam,
      minimumbid: createAuctionInput.minimumbid,
      bidincreaseby: createAuctionInput.bidincreaseby,
      playersperteam: createAuctionInput.playersperteam,
      auctionstatus: createAuctionInput.auctionstatus,
      image: createAuctionInput.image === "" ? null : createAuctionInput.image,
    });
  }

  public async findAll() {
    return this.auctionRepo.find({order:{auctionid:"ASC"}});
  }

  public async findOne(id: number) {
    return this.auctionRepo.findOne({where:{auctionid:id}})
  }

  public async update(id: number, updateAuctionInput: UpdateAuctionInput):Promise<Boolean> {
    const { userid, auctionname } = updateAuctionInput;
    const auctionData = await this.auctionRepo.findOne({where:{auctionid:id}})
    const user = await this.userService.findOne(userid);
    if (!user) {
      throw new Error('User not found');
    }
    const existingAuction = user.auction.find((auction) => auction.auctionname === auctionname && auctionData.auctionname !== auctionname);
    
    if (existingAuction) {
      throw new Error('Auction name already exists for the same user');
    }else{
      return (await this.auctionRepo.update(id, updateAuctionInput)).affected>0
    }
  }

  
}

