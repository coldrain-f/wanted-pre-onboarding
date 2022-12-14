import { Announcement } from 'src/announcement/announcement.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  constructor(aid: number, uid: number) {
    this.aid = aid;
    this.uid = uid;
  }

  @PrimaryGeneratedColumn()
  hid: number;

  @Column()
  uid: number;

  @Column()
  aid: number;

  @ManyToOne(() => Announcement, (announcement) => announcement.history)
  announcement: Announcement;

  @ManyToOne(() => User, (user) => user.history)
  user: User;
}
