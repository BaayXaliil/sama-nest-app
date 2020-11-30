import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserName, UserSchema } from './schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserName, schema: UserSchema}])
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
    ],
    exports: [UserService]
})
export class UserModule { }
