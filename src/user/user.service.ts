import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UserName } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService { 
    constructor(@InjectModel(UserName) private usermodel: Model<IUser>) {}

    async register(user: CreateUserDto) {
        const newUser = new this.usermodel(user)
        newUser.salt = await bcrypt.genSalt()
        newUser.password = await bcrypt.hash(newUser.password, newUser.salt)
        newUser.save()
        return await newUser;
    }

    async findUsers() {
        return await this.usermodel.find().exec()
    }
}
