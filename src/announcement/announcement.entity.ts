import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  aid: number;

  @Column()
  position: string;

  @Column()
  compensation: number;

  @Column()
  content: string;

  @Column()
  skill: string;
}
