import { Module } from '@nestjs/common';
import { PostsController } from './controller/posts.controller'
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/post.schema'
import { PostsService } from './service/posts.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
    controllers: [PostsController],
    providers: [
        PostsService
    ]
})
export class PostsModule {}
