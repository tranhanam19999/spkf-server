import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './media/media.module';

@Module({
  imports: [ConfigModule.forRoot(),PostsModule, MongooseModule.forRoot(process.env.MONGO_URL), MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
