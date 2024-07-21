import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreatePostBodyDto {

    @IsString()
    title: string;

    @IsOptional()
    @IsNumberString()
    priceBefore: number;

    @IsNumberString()
    priceAfter: number;
}

