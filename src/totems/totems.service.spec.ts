import { Test, TestingModule } from '@nestjs/testing';
import { TotemsService } from './totems.service';

describe('TotemsService', () => {
  let service: TotemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TotemsService],
    }).compile();

    service = module.get<TotemsService>(TotemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
