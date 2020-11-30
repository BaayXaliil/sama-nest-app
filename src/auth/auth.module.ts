import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserName, UserSchema } from 'src/user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategies/strategy-jwt';

dotenv.config()
@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserName, schema: UserSchema}]),
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: { expiresIn: 3600 },
        }),
    ],
    controllers: [
        AuthController,],
    providers: [
        AuthService,
        JwtStrategy
    ],
})
export class AuthModule { }
