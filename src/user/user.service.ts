import { ErrorCodeEnum } from './../exceptions/error-code.enum';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';
import { RegisterInput } from './input/register.input';
import { generate } from 'voucher-code-generator';
import * as bcrypt from 'bcryptjs';
import * as slug from 'speakingurl';
import * as jwt from 'jsonwebtoken';
import { UserRoleEnum } from './user.enum';
import { BaseHttpException } from 'src/exceptions/base-http-exception';
import { EmailAndPasswordLoginInput } from './input/email-password-login.input';
import { PhoneNumberAndPasswordLoginInput } from './input/phone-password-login.input';
import { TokenPayload } from 'src/auth/auth-token-payload.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async findAllUser(): Promise<User[]> {
        return await this.userModel.find();
    }

    async registerAsUser(input: RegisterInput): Promise<User> {
        const errorIfUserWithEmailOrUserNameExists =
            await this.userModel.findOne({ $or: [{ email: input.email }, { userName: input.userName }] });
        if (errorIfUserWithEmailOrUserNameExists)
            throw new BaseHttpException(ErrorCodeEnum.USERNAME_OR_EMAIL_ALREADY_EXIST);
        const deleteDuplicatedUsersAtNotVerified =
            await this.userModel.findOne({ isVerified: false });
        if (deleteDuplicatedUsersAtNotVerified)
            await this.userModel.deleteOne({ _id: deleteDuplicatedUsersAtNotVerified.id });
        const registerNewUser = new this.userModel({
            ...input,
            fullName: `${input.firstName} ${input.lastName || ''}`.trim(),
            password: await this.hashPassword(input.password),
            slug: this.slugify(`${input.firstName} - ${input.lastName || ''}`),
            role: UserRoleEnum.USER
        });
        return registerNewUser.save();
    }

    async emailAndPasswordLogin(input: EmailAndPasswordLoginInput) {
        const user = await this.userModel.findOne({ email: input.email });
        if (!user) throw new BaseHttpException(ErrorCodeEnum.INVALID_CREDENTIALS);
        await this.matchPassword(input.password, user.password);
        const payload: TokenPayload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return { token };
    }

    async phoneNumberAndPasswordLogin(input: PhoneNumberAndPasswordLoginInput) {
        const user = await this.userModel.findOne({ phoneNumber: input.phoneNumber });
        if (!user) throw new BaseHttpException(ErrorCodeEnum.INVALID_CREDENTIALS);
        await this.matchPassword(input.password, user.password);
        const payload: TokenPayload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return { token };
    }

    private slugify(value: string): string {
        if (value.charAt(value.length - 1) === '-') value = value.slice(0, value.length - 1);
        return `${slug(value, { titleCase: true })}-${generate({
            charset: '123456789abcdefghgklmnorstuvwxyz',
            length: 4
        })[0]
            }`.toLowerCase();
    }

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    private async matchPassword(password: string, hash: string) {
        const isMatched = await bcrypt.compare(password, hash);
        if (!isMatched) throw new BaseHttpException(ErrorCodeEnum.INCORRECT_PASSWORD);
    }
}