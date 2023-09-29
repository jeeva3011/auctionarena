import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionModule } from './auction/auction.module';
import { FeaturesModule } from './features/features.module';
import { UserModule } from './user/user.module';
import { PlayersModule } from './players/players.module';
import { PricesModule } from './prices/prices.module';
import { TeamModule } from './team/team.module';
import datasource, { dataSourceOptions } from 'db/datasource.config';
import { EmailModule } from './email/email.module';
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { LiveModule } from './live/live.module';
import { SocketModule } from './socket/socket.module';
import { AwsModule } from './aws/aws.module';
import { CategoryModule } from './category/category.module';
import { FilehistoryModule } from './filehistory/filehistory.module';
import { BulkuploadModule } from './bulkupload/bulkupload.module';

@Module({
  imports: [SocketModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: join(process.cwd(),"/src/graphql-schema.gql")
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuctionModule,
    FeaturesModule,
    UserModule,
    PlayersModule,
    PricesModule,
    TeamModule,
    EmailModule,
    AuthModule,
    LiveModule,
    AwsModule,
    CategoryModule,
    FilehistoryModule,
    BulkuploadModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
