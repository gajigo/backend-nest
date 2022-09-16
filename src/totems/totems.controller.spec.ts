import { Test, TestingModule } from '@nestjs/testing';
import { TotemsController } from './totems.controller';
import { TotemsService } from './totems.service';

describe('TotemsController', () => {
  let controller: TotemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotemsController],
      providers: [TotemsService],
    }).compile();

    controller = module.get<TotemsController>(TotemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
