import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from 'src/user/models/user.model';
import { TokenPayload } from './auth-token-payload.interface';
import { BaseHttpException } from 'src/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/exceptions/error-code.enum';
import { Model } from 'mongoose';
import { UserRoleEnum } from 'src/user/user.enum';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.header('Authorization').split(' ')[1];
        if (!token) throw new BaseHttpException(ErrorCodeEnum.UNAUTHORIZED);
        const { userId } = <TokenPayload>jwt.verify(token, process.env.JWT_SECRET);
        if (!userId) throw new BaseHttpException(ErrorCodeEnum.INVALID_TOKEN);
        const user = await this.userModel.findOne({ _id: userId });
        if (!user) throw new UnauthorizedException(`Can't Find User`);
        if (user.role != UserRoleEnum.ADMIN) throw new BaseHttpException(ErrorCodeEnum.ALLOWED_FOR_ADMIN_ONLY);
        return true;
    }
}