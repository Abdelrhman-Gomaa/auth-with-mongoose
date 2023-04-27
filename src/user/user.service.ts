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
import { ErrorCodeEnum } from 'src/exceptions/error-code.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async findAllUser(): Promise<User[]> {
        return await this.userModel.find();
    }

    async registerAsUser(input: RegisterInput): Promise<User> {
        const errorIfUserWithVerifiedEmailExists =
            await this.userModel.findOne({ verifiedEmail: input.notVerifiedEmail });
        if (errorIfUserWithVerifiedEmailExists)
            throw new BaseHttpException(ErrorCodeEnum.USERNAME_OR_EMAIL_ALREADY_EXIST);
        const deleteDuplicatedUsersAtNotVerifiedEmail =
            await this.userModel.findOne({ notVerifiedEmail: input.notVerifiedEmail });
        if (deleteDuplicatedUsersAtNotVerifiedEmail)
            await this.userModel.deleteOne({ _id: deleteDuplicatedUsersAtNotVerifiedEmail.id });
        const registerNewUser = new this.userModel({
            ...input,
            fullName: `${input.firstName} ${input.lastName || ''}`.trim(),
            password: await this.hashPassword(input.password),
            slug: this.slugify(`${input.firstName} - ${input.lastName || ''}`),
            role: UserRoleEnum.USER
        });
        return registerNewUser.save();
    }

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    private slugify(value: string): string {
        if (value.charAt(value.length - 1) === '-') value = value.slice(0, value.length - 1);
        return `${slug(value, { titleCase: true })}-${generate({
            charset: '123456789abcdefghgklmnorstuvwxyz',
            length: 4
        })[0]
            }`.toLowerCase();
    }

    private async matchPassword(password: string, hash: string) {
        const isMatched = await bcrypt.compare(password, hash);
        if (!isMatched) throw new Error(' Incorrect Password');
    }
}