export class DetailAnnouncementDto {
  constructor(
    aid: number,
    companyName: string,
    country: string,
    region: string,
    position: string,
    compensation: number,
    skill: string,
    content: string,
    diffAnnouncements: number[],
  ) {
    this.aid = aid;
    this.companyName = companyName;
    this.country = country;
    this.region = region;
    this.position = position;
    this.compensation = compensation;
    this.skill = skill;
    this.content = content;
    this.diffAnnouncements = diffAnnouncements;
  }
  aid: number;
  companyName: string;
  country: string;
  region: string;
  position: string;
  compensation: number;
  skill: string;
  content: string;
  diffAnnouncements: number[];
}
