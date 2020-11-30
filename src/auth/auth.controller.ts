import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialDto } from './dto/login-credential.dto';

@Controller('login')
export class AuthController { 

    constructor(private authService: AuthService) {}

    @Post()
    login(@Body() credential: LoginCredentialDto) {
        return this.authService.login(credential)
    }
}
