import { InputType, Int, Field } from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';

@InputType()
export class CreateBulkuploadInput {
 @Field({nullable:true})
 playername:string;

 @Field({nullable:true})
 playermobile:number;

 @Field({nullable:true})
 playerrole: string;

 @Field({nullable:true})
 playerdob: Date;

 @Field({nullable:true})
 tshirtsize: string;

 @Field({nullable:true})
 trousersize: string;

 @Field({nullable:true})
 error: string;
}
