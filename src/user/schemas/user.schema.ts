import { Schema, Prop,SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "src/auth/enums/role.enum";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop()
    avatar: string;
    @Prop({required: true})
    roles:Role
}

export const UserSchema = SchemaFactory.createForClass(User);