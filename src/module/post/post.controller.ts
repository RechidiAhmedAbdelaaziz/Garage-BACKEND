import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostBodyDto } from './dto/createpost.dto';
import { ListPostsQueryDTO } from './dto/listposts.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post() //* POST | Create ~ {{host}}/api/v1/post
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @Body() details: CreatePostBodyDto,
    @UploadedFile() image?: Express.Multer.File
  ) {
    return await this.postService.createPost({ ...details, image })
  }

  @Get() //* GET | Get all ~ {{host}}/api/v1/post
  async getPosts(
    @Query() queries: ListPostsQueryDTO
  ) {
    return await this.postService.getPosts(queries)
  }
}
