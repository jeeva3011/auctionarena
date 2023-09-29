import { AwsService } from './aws.service';
import { Args, Resolver, Query } from '@nestjs/graphql';
@Resolver()
export class AwsResolver {
  constructor(private readonly awsService: AwsService) {}
  @Query(() => String, { name: 'getSignerUrlForUpload' })
  async getSignerUrlForUpload(
    @Args('filename') filename: string,
  ): Promise<string> {
    return await this.awsService.getSignerUrlForUpload(filename);
  }
}
