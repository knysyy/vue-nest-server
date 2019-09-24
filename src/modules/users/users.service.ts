import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './users.entity';
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
  ) {}

  async logout(user: UserInterface): Promise<UpdateResult> {
    return this.userRepository.update(
      { email: user.email },
      { token: uuid4() },
    );
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByToken(token: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { token } });
  }

  async register(user: UserInterface): Promise<User> {
    const newUser = this.userRepository.create(user);
    newUser.password = this.hashPassword(user.password);
    return this.userRepository.save(newUser);
  }

  protected hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(encryptConstants.saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}
