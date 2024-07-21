import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from 'src/models/post';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Pagination } from 'src/core/helper/pagination.helper';

@Injectable()
export class PostService {

    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        private cloudinaryService: CloudinaryService
    ) { }

    createPost = async (details: {
        title: string,
        priceBefore?: number,
        priceAfter: number,
        image?: Express.Multer.File
    }) => {

        const { title, priceBefore, priceAfter, image } = details;

        const post = new this.postModel();

        post.title = title;
        post.priceBefore = priceBefore;
        post.priceAfter = priceAfter;

        post.imgUrl = image ? (await this.cloudinaryService.uploadImage(image)).url : undefined

        return await post.save();

    }

    getPosts = async (
        options?: {
            page?: number
            limit?: number
            sort?: string
        }
    ) => {
        const sort = options?.sort || '-createdAt';
        const { page, generate, limit } = new Pagination(
            this.postModel,
            {
                page: options?.page,
                limit: options?.limit
            }
        ).getOptions();

        const posts = await this.postModel.find()
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        return await generate(posts)
    }



}
