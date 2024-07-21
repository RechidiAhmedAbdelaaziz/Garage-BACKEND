import { HttpException, Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {

    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,

        });
    }

    uploadImage = async (file: Express.Multer.File) => {
        console.log('image', file.path)


        const result = await cloudinary.uploader
            .upload(
                file.path,
                {
                    folder: "Garage",


                }
            )
            .catch((error) => {
                throw new HttpException(error, 500)
            });

        return result;

    }

    uploadMultiple = async (files?: Express.Multer.File[]) => {
        const promises = files?.map(async (file) => {
            return await this.uploadImage(file);
        });

        return await Promise.all(promises);
    }

}