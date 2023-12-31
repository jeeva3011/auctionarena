import { CreateTeamInput } from './create-team.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTeamInput extends PartialType(CreateTeamInput) {
  @Field(() => Int)
  teamid: number;

  @Field()
  teamname: string

  @Field()
  shortcutkey: string

  @Field()
  shortname: string

  @Field({nullable:true})
  image: string

}
