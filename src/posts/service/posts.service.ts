import { Model } from 'mongoose'
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schema/post.schema';
import { CreatePostDto } from '../dto/create-post.dto'
import { UpdatePostDto } from '../dto/update-post.dto'
//import { Post } from '../interface/post.interface'

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name)
        private postModel: Model<PostDocument>,
    ) {}

    async create(createPostDto: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel(createPostDto);
        return createdPost.save();
    }
    async update(id: String, updatePostDto: UpdatePostDto): Promise<Post> {
        let updatePost = await this.postModel.findById(id)
        updatePost.name = updatePostDto.name
        return updatePost.save()
    }
    async delete(id: String): Promise<String> {
        let updatePost = await this.postModel.findByIdAndDelete(id)
        if (updatePost) {
            await updatePost.save()
            return 'OK'
        }
        return 'Failed'
    }
    async findAll(): Promise<Post[]> {
        return this.postModel.find().exec();
    }
}
