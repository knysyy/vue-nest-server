import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserInterface } from './interface/user.interface';
import { encryptConstants } from '../../config/server.constatnts';

@Entity('users')
export default class User implements UserInterface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 30 })
  public name: string;

  @Column({ length: 255, unique: true })
  public email: string;

  @Column({ length: 80 })
  public password: string;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  public token: string;

  @BeforeInsert()
  encryptPassword() {
    const salt: string = bcrypt.genSaltSync(encryptConstants.saltRounds);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}
