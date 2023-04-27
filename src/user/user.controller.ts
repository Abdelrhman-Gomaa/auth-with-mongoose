import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './models/user.model';

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
}