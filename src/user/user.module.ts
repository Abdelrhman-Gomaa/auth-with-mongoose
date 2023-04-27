import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from './models/user.model';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: User.name, schema: UserSchema },
            ]
        ),
    ],
    controllers: [],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }