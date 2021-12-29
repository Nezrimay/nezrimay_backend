import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { config } from 'configs/local.config';
import { sign } from 'jsonwebtoken';
import { CommonResponseInterface } from 'src/types/commonResponse.interface';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async loginUser(
    loginUserDto: LoginUserDto,
  ): Promise<CommonResponseInterface> {
    const user = await this.userRepository.findOne({
      username: loginUserDto.username,
    });

    const isExist = compare(loginUserDto.password, user.password);

    if (!isExist) {
      throw new HttpException(
        'Неправильно введен пароль',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (user) {
      return {
        status: HttpStatus.OK,
        message: 'Пользователь успешно залогинен',
        body: {
          token: this.generateJwt(user),
        },
      };
    }

    throw new HttpException(
      'Пользователь не найден',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<CommonResponseInterface> {
    const userByEmail = await this.userRepository.findOne({
      email: registerUserDto.email,
    });

    const userByUsername = await this.userRepository.findOne({
      username: registerUserDto.username,
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Пользователь с такими данными уже зарегистрирован',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    // Чтобы затриггерить @BeforeInsert мы обязаны клонировать(?) объект
    Object.assign(newUser, registerUserDto);

    await this.userRepository.save(newUser);

    return {
      status: HttpStatus.OK,
      message: 'Пользователь успешно зарегистрирован',
    };
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ id });
  }

  private generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      config.salt,
    );
  }
}
