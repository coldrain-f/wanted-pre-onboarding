import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { AnnouncementService } from './announcement.service';
import { ApplyAnnouncementDto } from './dto/apply-announcement.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { DetailAnnouncementDto } from './dto/detail-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Controller('announcement')
@UseFilters(HttpExceptionFilter)
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  /**
   * 채용공고 등록 API
   */
  @Post()
  create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    this.announcementService.create(createAnnouncementDto);
  }

  /**
   * 채용공고 수정 API
   */
  @Patch(':id')
  modify(
    @Param('id') id: number,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    this.announcementService.modify(id, updateAnnouncementDto);
  }

  /**
   *
   * 채용공고 삭제 API
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    this.announcementService.remove(id);
  }

  /**
   *
   * 채용공고 목록 API
   */
  @Get()
  findAll() {
    return this.announcementService.findAll();
  }

  /**
   *
   * 채용공고 상세 API
   */
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.announcementService.findById(id);
  }

  /**
   *
   * 채용공고 지원 API
   */
  @Post('/apply')
  apply(@Body() applyAnnouncementDto: ApplyAnnouncementDto) {
    return this.announcementService.apply(applyAnnouncementDto);
  }
}
