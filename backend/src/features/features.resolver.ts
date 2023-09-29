import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FeaturesService } from './features.service';
import { Feature } from './entities/feature.entity';
import { CreateFeatureInput } from './dto/create-feature.input';
import { UpdateFeatureInput } from './dto/update-feature.input';

@Resolver(() => Feature)
export class FeaturesResolver {
  constructor(private readonly featuresService: FeaturesService) {}

  @Mutation(() => Feature)
  createFeature(@Args('createFeatureInput') createFeatureInput: CreateFeatureInput) {
    return this.featuresService.create(createFeatureInput);
  }

  @Query(()=>[Feature])
  getAllFeatures(){
    return this.featuresService.getAllFeatures();
  }
}