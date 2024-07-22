import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Post } from 'src/models/post';
import { CloudinaryModule } from '../../core/modules/cloudinary/cloudinary.module';

const databaseModule = MongooseModule.forFeature([
  {
    name: Post.name, schema: SchemaFactory.createForClass(Post)
  }
]);

@Module({
  imports: [databaseModule, CloudinaryModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
