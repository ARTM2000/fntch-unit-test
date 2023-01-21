import { Module } from '@nestjs/common';
import { PostgresModule } from '@app/database/postgres/postgres.module';
import { PostModule } from '@app/post/post.module';
import { UserModule } from '@app/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PostgresModule, PostModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
