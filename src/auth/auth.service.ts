import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserName } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { LoginCredentialDto } from './dto/login-credential.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService { 
    constructor(
        @InjectModel(UserName) private userModel: Model<IUser>,
        private jwtServie: JwtService
    ) {}

    async login(credentials: LoginCredentialDto ) {
        const {username, password} = credentials;
        let user = await this.userModel.findOne({username})
        
        if(!user) {
            user = await this.userModel.findOne({email: username})
        }
        if(!user)
            throw new NotFoundException(`L'utilisateur ${username} n'existe pas`);
        
        const passwordHashed = await bcrypt.hash(password, user.password)
        if (passwordHashed === user.password) {
            const payload = {username: user.username, email: user.email, role: user.role}
            const jwt = this.jwtServie.sign(payload)
            return { "access_token": jwt }
        }
        
        throw new NotFoundException("Mot de pass incorrect !")
    }
}
