import * as mongoose from 'mongoose';
import { UserName } from 'src/user/schemas/user.schema';
const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    user: { type: Schema.Types.Mixed, ref: UserName}
});

export const ProductName = "Product";