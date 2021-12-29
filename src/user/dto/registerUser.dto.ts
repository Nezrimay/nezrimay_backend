import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;
}
