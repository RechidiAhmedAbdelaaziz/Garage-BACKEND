import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostBodyDto } from './dto/createpost.dto';
import { ListPostsQueryDTO } from './dto/listposts.dto';
import { Schema } from 'mongoose';
import { MongoObjectIdPipe } from 'src/core/pipes/mongoid.pipe';
import { EditPostBody } from './dto/editpost.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get() //* POST | Get all ~ {{host}}/api/v1/post
  async getPosts(
    @Query() queries: ListPostsQueryDTO
  ) {
    return await this.postService.getPosts(queries)
  }


  @Post() //* POST | Create ~ {{host}}/api/v1/post
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @Body() details: CreatePostBodyDto,
    @UploadedFile() image?: Express.Multer.File
  ) {
    return await this.postService.createPost({ ...details, image })
  }

  @Get(':id') //* POST | Get one ~ {{host}}/api/v1/post/:id
  async getPost(
    @Param('id', MongoObjectIdPipe) id: Schema.Types.ObjectId
  ) {
    return await this.postService.getPost(id)
  }

  @Patch(':id') //* POST | Edit ~ {{host}}/api/v1/post/:id
  @UseInterceptors(FileInterceptor('newImage'))
  async editPost(
    @Param('id', MongoObjectIdPipe) id: Schema.Types.ObjectId,
    @Body() body: EditPostBody,
    @UploadedFile() newImage?: Express.Multer.File

  ) {
    return await this.postService.editPost(id, { ...body, newImage })
  }

  @Delete(':id') //* POST | Delete ~ {{host}}/api/v1/post/:id
  async deletePost(
    @Param('id', MongoObjectIdPipe) id: Schema.Types.ObjectId
  ) {
    await this.postService.deletePost(id)
  }

}
