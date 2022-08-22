import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  cid: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  region: string;
}
