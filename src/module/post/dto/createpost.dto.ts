import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreatePostBodyDto {

    @IsString()
    title: string;

    @IsNumberString()
    price: number;
}

