import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

describe('AnnouncementService', () => {
  let service: AnnouncementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnouncementService],
    }).compile();

    service = module.get<AnnouncementService>(AnnouncementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('title', async () => {
    const announcement = new CreateAnnouncementDto(
      1,
      '백엔드 주니어 개발자',
      10000000,
      '원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..',
      'Python',
    );
    const aid = await service.create(announcement);
    const result = await service.findById(aid);

    expect(result.companyName).toBe('백엔드 주니어 개발자');
    expect(result.compensation).toBe(1000000);
    expect(result.content).toBe(
      '원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..',
    );
    expect(result.skill).toBe('Python');
  });
});
