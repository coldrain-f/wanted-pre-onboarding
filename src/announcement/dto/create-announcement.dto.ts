import { IsInt, IsString } from 'class-validator';

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