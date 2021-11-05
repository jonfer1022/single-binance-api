import { Test, TestingModule } from '@nestjs/testing';
import { TasksCronService } from './tasks-cron.service';

describe('TasksCronService', () => {
  let service: TasksCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksCronService],
    }).compile();

    service = module.get<TasksCronService>(TasksCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
