import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 30 })
  public name: string;

  @Column({ length: 255, unique: true })
  public email: string;

  @Column({ length: 80 })
  public password: string;

  @Column({ type: "uuid", default: () => "uuid_generate_v4()" })
  public token: string;

  setProperty(properties: Partial<User>) {
    Object.assign(this, properties);
  }
}
