import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuctionService } from './auction.service';
import { Auction } from './entities/auction.entity';
import { CreateAuctionInput } from './dto/create-auction.input';
import { UpdateAuctionInput } from './dto/update-auction.input';
import { UseGuards } from '@nestjs/common';
import { CognitoAuthGuard } from 'src/auth/cognito.guar';

@Resolver(() => Auction)
export class AuctionResolver {
  constructor(private readonly auctionService: AuctionService) {}

  @Mutation(() => Auction)
  @UseGuards(CognitoAuthGuard)
  public async createAuction(@Args('createAuctionInput') createAuctionInput: CreateAuctionInput) {
    return  this.auctionService.create(createAuctionInput);
  }

  @Query(() => [Auction], { name: 'getAllAuction' })
  public async findAll() {
    return  this.auctionService.findAll();
  }

  @Query(() => Auction, { name: 'auction' })
  @UseGuards(CognitoAuthGuard)
  public async findOne(@Args('id', { type: () => Int }) id: number) {
    return  this.auctionService.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(CognitoAuthGuard)
  public async updateAuction(@Args('updateAuctionInput') updateAuctionInput: UpdateAuctionInput):Promise<Boolean> {
    return  this.auctionService.update(updateAuctionInput.auctionid, updateAuctionInput);
  }
}
