import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FilehistoryService } from './filehistory.service';
import { Filehistory } from './entities/filehistory.entity';
import { CreateFilehistoryInput } from './dto/create-filehistory.input';
import { UpdateFilehistoryInput } from './dto/update-filehistory.input';
import { CognitoAuthGuard } from 'src/auth/cognito.guar';
import { UseGuards } from '@nestjs/common/decorators';
@Resolver(() => Filehistory)
export class FilehistoryResolver {
  constructor(private readonly filehistoryService: FilehistoryService) {}

  @Mutation(() => Filehistory)
  @UseGuards(CognitoAuthGuard)
  createFilehistory(@Args('createFilehistoryInput') createFilehistoryInput: CreateFilehistoryInput) {
    return this.filehistoryService.create(createFilehistoryInput);
  }

  @Query(() => [Filehistory], { name: 'filehistoryAll' })
  @UseGuards(CognitoAuthGuard)
  findAll(auctionid: number) {
    return this.filehistoryService.findAll(auctionid);
  }

  @Query(() => Filehistory, { name: 'filehistory' })
  findOne(@Args('id', { type: () => Int }) id: number, @Args('errorfilepath', { type: () => String }) errorfilepath: string) {
    return this.filehistoryService.findOne(id, errorfilepath);
  }

  @Mutation(() => Filehistory)
  updateFilehistory(@Args('updateFilehistoryInput') updateFilehistoryInput: UpdateFilehistoryInput) {
    return this.filehistoryService.update(updateFilehistoryInput.field, updateFilehistoryInput);
  }

  @Mutation(() => Filehistory)
  removeFilehistory(@Args('id', { type: () => Int }) id: number) {
    return this.filehistoryService.remove(id);
  }
}
