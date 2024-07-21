import { IsOptional, IsString } from "class-validator";
import { PaginationParamsDTO } from "src/core/helper/pagination.helper";

export class ListPostsQueryDTO extends PaginationParamsDTO {

    @IsOptional()
    @IsString()
    sort?: string;
}