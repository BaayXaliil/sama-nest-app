import * as mongoose from 'mongoose';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import Schema = mongoose.Schema;
export const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true},
    salt: { type: String },
    role: { type: String, default: UserRoleEnum.USER }
})

export const UserName = "User"

