import { Document } from "mongoose";
import { IUser } from "src/user/interfaces/user.interface";

export interface ProductDocument extends Document {
    id: string;
    name: string;
    description: string;
    price: number;
    user: IUser;
}