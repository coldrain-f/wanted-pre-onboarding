import { IsInt, IsString } from 'class-validator';

export class CreateAnnouncementDto {
  constructor(
    cid: number,
    position: string,
    compensation: number,
    content: string,
    skill: string,
  ) {
    this.cid = cid;
    this.position = position;
    this.compensation = compensation;
    this.content = content;
    this.skill = skill;
  }
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
