import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { Post } from 'src/models/post';
import { CloudinaryService } from '../../core/modules/cloudinary/cloudinary.service';
import { Pagination } from 'src/core/helpers/pagination.helper';

@Injectable()
export class PostService {

    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        private cloudinaryService: CloudinaryService
    ) { }

    createPost = async (details: {
        title: string,
        price: number,
        image?: Express.Multer.File
    }) => {

        const { title, price, image } = details;

        const post = new this.postModel();

        post.title = title;
        post.priceAfter = price;

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

    getPost = async (id: Schema.Types.ObjectId) => {
        const post = await this.postModel.findById(id);

        if (!post) throw new HttpException('Post not found', 404);

        return post;
    }

    editPost = async (id: Schema.Types.ObjectId, details: {
        newPrice?: number,
        newTitle?: string,
        newImage?: Express.Multer.File
    }) => {
        const { newPrice, newImage, newTitle } = details;
        const post = await this.postModel.findById(id);

        if (!post) throw new HttpException('Post not found', 404);

        if (newPrice) {
            post.priceBefore = post.priceAfter;
            post.priceAfter = newPrice;
        }

        if (newImage) post.imgUrl = (await this.cloudinaryService.uploadImage(newImage)).url

        if (newTitle) post.title = newTitle;

        return await post.save();
    }

    deletePost = async (id: Schema.Types.ObjectId) => {
        const post = await this.postModel.findByIdAndDelete(id);

        if (!post) throw new HttpException('Post not found', 404);
    }



}
