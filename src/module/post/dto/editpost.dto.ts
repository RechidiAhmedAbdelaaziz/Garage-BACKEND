import { IsNumberString, IsOptional, IsString } from "class-validator";

export class EditPostBody {

    @IsOptional()
    @IsNumberString()
    newPrice: number

    @IsOptional()
    @IsString()
    newTitle: string
}