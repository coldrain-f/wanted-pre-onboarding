import { Announcement } from 'src/announcement/announcement.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Announcement, (announcement) => announcement.company)
  announcement: Announcement[];
}
