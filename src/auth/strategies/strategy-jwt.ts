import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PayloadDto } from '../dto/payload.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserName } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { IUser } from 'src/user/interfaces/user.interface';

dotenv.config()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(UserName) private userModel: Model<IUser>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET
        });
    }

    async validate(payload: PayloadDto) {        
        const {username} = payload;
        let user = await this.userModel.findOne({ username })
        if (!user) throw new UnauthorizedException()
        
        return {
            username: user.username,
            email: user.email,
            role: user.role,
            _id: user.id
        };
    }
}