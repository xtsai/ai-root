import { Test, TestingModule } from '@nestjs/testing';
import { BotOrmService } from './bot-orm.service';

describe('BotOrmService', () => {
  let service: BotOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotOrmService],
    }).compile();

    service = module.get<BotOrmService>(BotOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
