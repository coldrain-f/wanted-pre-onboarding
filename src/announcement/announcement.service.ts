import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/company.entity';
import { History } from 'src/history/history.entity';
import { Repository } from 'typeorm';
import { Announcement } from './announcement.entity';
import { ApplyAnnouncementDto } from './dto/apply-announcement.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { DetailAnnouncementDto } from './dto/detail-announcement.dto';
import { ListDetailAnnouncementDto } from './dto/listDetail-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement)
    private announcementRepository: Repository<Announcement>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async create(createAnnouncementDto: CreateAnnouncementDto) {
    // 찾은 회사가 없을 경우 Exception 처리하기
    const company = await this.companyRepository.findOneBy({
      cid: createAnnouncementDto.cid,
    });

    const announcement = new Announcement(
      company,
      createAnnouncementDto.position,
      createAnnouncementDto.compensation,
      createAnnouncementDto.content,
      createAnnouncementDto.skill,
    );
    this.announcementRepository.save(announcement);
  }

  async remove(id: number) {
    this.announcementRepository.delete({ aid: id });
  }

  async modify(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    const announcement = await this.announcementRepository.findOneBy({
      aid: id,
    });

    this.announcementRepository.update(
      { aid: id },
      {
        position:
          updateAnnouncementDto.position === undefined
            ? announcement.position
            : updateAnnouncementDto.position,
        compensation:
          updateAnnouncementDto.compensation === undefined
            ? announcement.compensation
            : updateAnnouncementDto.compensation,
        content:
          updateAnnouncementDto.content === undefined
            ? announcement.content
            : updateAnnouncementDto.content,
        skill:
          updateAnnouncementDto.skill === undefined
            ? announcement.skill
            : updateAnnouncementDto.skill,
      },
    );
  }

  async findAll() {
    const annList = await this.announcementRepository.find({
      relations: ['company'],
    });

    return annList.map(
      (ann) =>
        new ListDetailAnnouncementDto(
          ann.aid,
          ann.company.name,
          ann.company.country,
          ann.company.region,
          ann.position,
          ann.compensation,
          ann.skill,
        ),
    );
  }

  async findById(id: number) {
    const ann = await this.announcementRepository.findOne({
      where: { aid: id },
      relations: ['company'],
    });

    const annList = await this.announcementRepository.findBy({
      company: ann.company,
    });

    const aidList: number[] = annList
      .map((an) => an.aid)
      .filter((aid) => aid !== ann.aid);

    return new DetailAnnouncementDto(
      ann.aid,
      ann.company.name,
      ann.company.country,
      ann.company.region,
      ann.position,
      ann.compensation,
      ann.skill,
      ann.content,
      aidList,
    );
  }

  apply(applyAnnouncementDto: ApplyAnnouncementDto) {
    // 1회만 지원 가능하도록 예외 처리 필요

    const history = new History(
      applyAnnouncementDto.aid,
      applyAnnouncementDto.uid,
    );

    this.historyRepository.save(history);
  }
}
