import { IsEmail, MaxLength, MinLength, Matches, IsString, IsBoolean } from "class-validator";
import { UserMessagesHelper } from "../helpers/message.helper";
import { Role } from "src/auth/enums/role.enum";

export class RegisterDto {

    @MinLength(2, { message: UserMessagesHelper.REGISTER_NAME_NOT_VALID })
    name: string;

    @IsEmail({}, { message: UserMessagesHelper.REGISTER_EMAIL_NOT_VALID })
    email: string;

    @MinLength(4, { message: UserMessagesHelper.REGISTER_PASSWORD_NOT_VALID })
    @MaxLength(12, { message: UserMessagesHelper.REGISTER_PASSWORD_NOT_VALID })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: UserMessagesHelper.REGISTER_PASSWORD_NOT_VALID,
    })
    password: string;

    @IsString()
    avatar: string;

    roles:Role

}