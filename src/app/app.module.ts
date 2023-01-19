import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/database/postgres/postgres.module';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PostgresModule, PostModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
