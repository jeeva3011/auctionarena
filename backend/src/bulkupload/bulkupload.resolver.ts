import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { BulkuploadService } from './bulkupload.service';

@Resolver()
export class BulkuploadResolver {
  constructor(private readonly bulkuploadService: BulkuploadService) {}

  @Mutation(() => Boolean)
  async Excelupload(
    @Args('file') file: string,
    @Args('auctionid') auctionid: number,
    @Args('filename') filename: string,
  ): Promise<boolean> {
    return this.bulkuploadService.Excelupload(file, auctionid, filename);
  }
}
