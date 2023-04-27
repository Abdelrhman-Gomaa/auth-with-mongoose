import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';
import { UserRoleEnum } from '../user.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    fullName: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    userName: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    email: string;

    @Prop({ type: Boolean, default: false })
    isVerified: boolean;

    @Prop()
    slug: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    nation: string;

    @Prop()
    birthDay: Date;

    @Prop({
        type: String,
        enum: UserRoleEnum
    })
    role: UserRoleEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);