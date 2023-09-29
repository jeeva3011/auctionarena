import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PricesService } from './prices.service';
import { Price } from './entities/price.entity';
import { CreatePriceInput } from './dto/create-price.input';
import { UpdatePriceInput } from './dto/update-price.input';

@Resolver(() => Price)
export class PricesResolver {
  constructor(private readonly pricesService: PricesService) {}

  @Mutation(() => Price)
  createPrice(@Args('createPriceInput') createPriceInput: CreatePriceInput) {
    return this.pricesService.create(createPriceInput);
  }

  @Query(()=>[Price])
  getAllPrice(){
    return this.pricesService.getAllPrice();
  }  

 
}
