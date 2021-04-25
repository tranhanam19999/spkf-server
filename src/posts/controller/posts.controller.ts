import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PostsService } from '../service/posts.service'
import { CreatePostDto } from '../dto/create-post.dto'
import { UpdatePostDto } from '../dto/update-post.dto'
import { Request } from 'express';

@Controller('posts')
export class PostsController {
    constructor(private readonly postServices: PostsService) {}
    @Get()
    findAll() {
        return 'All Posts Here'
    }
    @Post('/create')
    async create(@Body() createPostDto: CreatePostDto) {
        return this.postServices.create(createPostDto);
    }
    @Put('/edit/:id')
    async update(@Param('id') id, @Body() updatePostDto: UpdatePostDto) {
        return this.postServices.update(id, updatePostDto);
    }
    @Delete('/delete/:id')
    async delete(@Param('id') id) {
        return this.postServices.delete(id);
    }
    @Get('/list')
    list() {
        return this.postServices.findAll()
    }
}
