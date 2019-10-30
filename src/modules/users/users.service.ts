import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entity/users.entity';
import { Repository, UpdateResult } from 'typeorm';
import * as uuid4 from 'uuid/v4';
import * as bcrypt from 'bcryptjs';
import { encryptConstants } from '../../config/server.constatnts';
import RegisterUserDto from '../auth/dto/register-user.dto';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async logout(user: User): Promise<void> {
    const result: UpdateResult = await this.userRepository.update(
      { token: user.token },
      { token: uuid4() },
    );
    if (result.affected < 0) {
      throw new BadRequestException();
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByToken(token: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { token } });
  }

  async register(reqUser: RegisterUserDto): Promise<User> {
    const user = await this.findByEmail(reqUser.email);
    if (user) {
      throw new BadRequestException();
    }
    const newUser = this.userRepository.create(reqUser);
    newUser.password = this.hashPassword(reqUser.password);
    // TODO Tokenの生成方法を検討。
    newUser.verificationToken = uuid4();
    return this.userRepository.save(newUser);
  }

  async update(reqUser: User, newUser: UpdateUserDto): Promise<User> {
    await this.userRepository.update({ token: reqUser.token }, { ...newUser });
    reqUser.setProperty({ ...newUser });
    return reqUser;
  }

  protected hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(encryptConstants.saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}
