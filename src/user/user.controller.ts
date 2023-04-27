import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { RegisterInput } from './input/register.input';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: "Find All User" })
    @Get()
    async findAllUser(): Promise<User[]> {
        return await this.userService.findAllUser();
    }

    @ApiOperation({ summary: "Create A new User / Registration" })
    @Post('/registerAsUser')
    async registerAsUser(@Body(ValidationPipe) input: RegisterInput) {
        return await this.userService.registerAsUser(input);
    }
}