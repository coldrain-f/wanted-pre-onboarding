export class ListDetailAnnouncementDto {
  constructor(
    aid: number,
    companyName: string,
    country: string,
    region: string,
    position: string,
    compensation: number,
    skill: string,
  ) {
    this.aid = aid;
    this.companyName = companyName;
    this.country = country;
    this.region = region;
    this.position = position;
    this.compensation = compensation;
    this.skill = skill;
  }
  aid: number;
  companyName: string;
  country: string;
  region: string;
  position: string;
  compensation: number;
  skill: string;
}
