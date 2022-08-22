import { Company } from 'src/company/company.entity';
import { History } from 'src/history/history.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Announcement {
  constructor(
    company: Company,
    position: string,
    compensation: number,
    content: string,
    skill: string,
  ) {
    this.company = company;
    this.position = position;
    this.compensation = compensation;
    this.content = content;
    this.skill = skill;
  }

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

  @ManyToOne(() => Company, (company) => company.announcement)
  company: Company;

  @OneToMany(() => History, (history) => history.announcement)
  history: History[];
}
