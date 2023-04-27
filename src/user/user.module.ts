import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from './models/user.model';
import { UserController } from './user.controller';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: User.name, schema: UserSchema },
            ]
        ),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }