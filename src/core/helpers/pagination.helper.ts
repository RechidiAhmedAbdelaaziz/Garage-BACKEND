import { IsNumberString, IsOptional } from "class-validator";
import { FilterQuery, Model } from "mongoose";

export class Pagination<T> {
    constructor(
        private readonly model: Model<T>,
        private readonly options?: {
            page?: number;
            limit?: number;
            filter?: FilterQuery<T>
        }

    ) { }

    getOptions() {

        const page = this.options.page || 1;
        const limit = this.options.limit || 10;
        return {
            page,
            limit,
            generate: (list: any[]) => this.generate(list, { page, limit })
        }

    }

    private async generate(list: any[], options: { page: number, limit: number }) {

        const { page, limit } = options;


        const total = await this.model.countDocuments(this.options.filter);

        const currentPage = Math.min(page, Math.ceil(total / limit));

        return {
            pagination: {
                page: currentPage || 0,
                length: list.length,
                next: total > currentPage * limit ? currentPage + 1 : undefined,
                prev: currentPage > 1 ? currentPage - 1 : undefined,
            },
            data: list
        }
    }
}

export class PaginationParamsDTO {
    @IsOptional()
    @IsNumberString()
    page?: number;

    @IsOptional()
    @IsNumberString()
    limit?: number;
}