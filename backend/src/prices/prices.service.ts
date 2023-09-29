import { Injectable } from '@nestjs/common';
import { CreatePriceInput } from './dto/create-price.input';
import { UpdatePriceInput } from './dto/update-price.input';
import { Repository } from 'typeorm';
import { Price } from './entities/price.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PricesService {
  constructor(@InjectRepository(Price) private readonly pricesRepo: Repository<Price>){}

  public async create(createPriceInput: CreatePriceInput) {
    return this.pricesRepo.save({
      count: createPriceInput.count,
      amount: createPriceInput.amount
    })
  }

  public async getAllPrice(){
    return this.pricesRepo.find();
  }

  
}
