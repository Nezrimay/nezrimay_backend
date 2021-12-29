import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommonResponseInterface } from 'src/types/commonResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<CommonResponseInterface> {
    return this.userService.loginUser(loginUserDto);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<CommonResponseInterface> {
    return this.userService.registerUser(registerUserDto);
  }
}
