import { History } from 'src/history/history.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  name: string;

  @OneToMany(() => History, (history) => history.user)
  history: History[];
}
