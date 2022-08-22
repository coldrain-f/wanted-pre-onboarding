import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  hid: number;

  @Column()
  uid: number;

  @Column()
  aid: number;
}
