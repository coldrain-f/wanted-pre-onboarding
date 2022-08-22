import { IsInt, IsString } from 'class-validator';
import { Company } from 'src/company/company.entity';
import { Announcement } from '../announcement.entity';

export class CreateAnnouncementDto {
  @IsInt()
  cid: number;

  @IsString()
  position: string;

  @IsInt()
  compensation: number;

  @IsString()
  content: string;

  @IsString()
  skill: string;
}
