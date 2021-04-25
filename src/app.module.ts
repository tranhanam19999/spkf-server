import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PostsModule, MongooseModule.forRoot('mongodb://localhost:27017/spkf-db')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
