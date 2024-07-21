import { Prop, Schema } from "@nestjs/mongoose";
import { AbstractSchema } from ".";


@Schema()
export class Post extends AbstractSchema {
    @Prop()
    title: string;

    @Prop({ default: 0 })
    priceBefore: number;

    @Prop()
    priceAfter: number;

    @Prop()
    imgUrl: string;
}

