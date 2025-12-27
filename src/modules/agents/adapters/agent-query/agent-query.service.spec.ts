import { Test, TestingModule } from '@nestjs/testing';
import { AgentQueryService } from './agent-query.service';

describe('AgentQueryService', () => {
  let service: AgentQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentQueryService],
    }).compile();

    service = module.get<AgentQueryService>(AgentQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
