import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { AuctionService } from 'src/auction/auction.service';
import { Auction } from 'src/auction/entities/auction.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepo : Repository<Category>,private auctionService : AuctionService){}

  public async create(createCategoryInput: CreateCategoryInput) {
    const auction = await this.auctionService.findOne(createCategoryInput.auctionid);
    return await this.categoryRepo.save({
      auction:auction,
      auctionid:createCategoryInput.auctionid,
      category:createCategoryInput.category,
      minimumbid:createCategoryInput.minimumbid
    }) 
  }

  public async findAll(category:string,auctionid: number):Promise<Boolean> {
    const data = await this.categoryRepo.findOne({where:{category:category,auctionid:auctionid}});
    if(!data){
      return false;
     }
     return true;
  }

  findOne(category: string) {
    return this.categoryRepo.findOne({where:{category:category}});
  }

  public async update(id: number, updateCategoryInput: UpdateCategoryInput):Promise<Boolean>{
    return (await this.categoryRepo.update(id,updateCategoryInput)).affected>0;
  }

  public async remove(id: number) {
    try {
      const record = await this.categoryRepo.find({ where: { categoryid: id } });
      if (!record) {
        throw new Error('Record not found');
      }
      await this.categoryRepo.remove(record);
      return true;
    } catch (error) {
      console.error('Error deleting record:', error);
      return false;
    }
  }
}
