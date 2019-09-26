import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entity/users.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserInterface } from './interface/user.interface';
import * as uuid4 from 'uuid/v4';
import * as bcrypt from 'bcryptjs';
import { encryptConstants } from '../../config/server.constatnts';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async logout(user: UserInterface): Promise<void> {
    const result: UpdateResult = await this.userRepository.update(
      { email: user.email },
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

  async register(reqUser: UserInterface): Promise<User> {
    const user = await this.findByEmail(reqUser.email);
    if (user) {
      throw new InternalServerErrorException();
    }
    const newUser = this.userRepository.create(reqUser);
    newUser.password = this.hashPassword(reqUser.password);
    return this.userRepository.save(newUser);
  }

  protected hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(encryptConstants.saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}
