import { IsOptional, IsString } from "class-validator";
import { PaginationParamsDTO } from "src/core/helpers/pagination.helper";

export class ListPostsQueryDTO extends PaginationParamsDTO {

    @IsOptional()
    @IsString()
    sort?: string;
}