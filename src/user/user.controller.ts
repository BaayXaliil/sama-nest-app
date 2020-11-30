import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    createUser(@Body() user: CreateUserDto) {        
        return this.userService.register(user)
    }

    @Get()
    findUsers() {
        return this.userService.findUsers();
    }
}
