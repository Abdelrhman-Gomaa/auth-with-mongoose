import { Body, Controller, Get, Post, UseGuards, ValidationPipe, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { RegisterInput } from './input/register.input';
import { PhoneNumberAndPasswordLoginInput } from './input/phone-password-login.input';
import { EmailAndPasswordLoginInput } from './input/email-password-login.input';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { CurrentUser } from 'src/auth/auth-user.decorator';
import { ChangePasswordInput } from './input/change.password.input';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @UseGuards(AdminGuard)
    @ApiOperation({ summary: "Find All User" })
    @Get()
    async findAllUser(): Promise<User[]> {
        return await this.userService.findAllUser();
    }

    @UseGuards(AuthGuard)
    @ApiOperation({ summary: "Find Current User" })
    @Get('/me')
    async me(@CurrentUser() userId: string): Promise<User> {
        return await this.userService.me(userId);
    }

    @ApiOperation({ summary: "Create A new User / Registration" })
    @Post('/registerAsUser')
    async registerAsUser(@Body(ValidationPipe) input: RegisterInput) {
        return await this.userService.registerAsUser(input);
    }

    @ApiOperation({ summary: "Login with Email to App" })
    @Post('/loginWithEmail')
    async emailAndPasswordLogin(@Body(ValidationPipe) input: EmailAndPasswordLoginInput) {
        return await this.userService.emailAndPasswordLogin(input);
    }

    @ApiOperation({ summary: "Login with Phone Number to App" })
    @Post('/loginWithPhoneNumber')
    async phoneNumberAndPasswordLogin(@Body(ValidationPipe) input: PhoneNumberAndPasswordLoginInput) {
        return await this.userService.phoneNumberAndPasswordLogin(input);
    }

    @ApiOperation({ summary: "Login with Phone Number to App" })
    @Patch('/changePassword')
    async changePassword(@CurrentUser() userId: string, @Body(ValidationPipe) input: ChangePasswordInput) {
        return await this.userService.changePassword(userId, input);
    }
}