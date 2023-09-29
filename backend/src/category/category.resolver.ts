import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { UseGuards } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CognitoAuthGuard } from 'src/auth/cognito.guar';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  @UseGuards(CognitoAuthGuard)
  createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => Boolean, { name: 'category' })
  findAllCategory(@Args('category') category: string,@Args('auctionid', { type: () => Int }) auctionid: number) {
    return this.categoryService.findAll(category,auctionid);
  }

  @Query(() => Category, { name: 'category' })
  @UseGuards(CognitoAuthGuard)
  findCategory(@Args('category') category: string) {
    return this.categoryService.findOne(category);
  }

  @Mutation(() => Boolean)
  @UseGuards(CognitoAuthGuard)
  updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
    return this.categoryService.update(updateCategoryInput.categoryid, updateCategoryInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(CognitoAuthGuard)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }
}
