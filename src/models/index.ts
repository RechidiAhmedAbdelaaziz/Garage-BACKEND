// export * from './post';

import { Schema as DSchema } from "@nestjs/mongoose";
import { Document, Schema } from "mongoose";


@DSchema()
export abstract class AbstractSchema extends Document<Schema.Types.ObjectId> {

}