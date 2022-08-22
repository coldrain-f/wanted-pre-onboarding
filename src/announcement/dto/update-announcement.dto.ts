import { IsString, IsInt } from 'class-validator';

export class UpdateAnnouncementDto {
  @IsString()
  position: string;

  @IsInt()
  compensation: number;

  @IsString()
  content: string;

  @IsString()
  skill: string;
}
