import { Injectable } from '@nestjs/common';
import { CreateFeatureInput } from './dto/create-feature.input';
import { UpdateFeatureInput } from './dto/update-feature.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeaturesService {
  constructor(@InjectRepository(Feature) private readonly featuresRepo: Repository<Feature>){}

  public async create(createFeatureInput: CreateFeatureInput) {
    return this.featuresRepo.save({
      name: createFeatureInput.name,
      description: createFeatureInput.description
    })
  }

  public async getAllFeatures(){
    return this.featuresRepo.find();
  }

 
}
