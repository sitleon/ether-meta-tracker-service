import { Test, TestingModule } from '@nestjs/testing';
import { ScheduledTaskService } from './scheduled-task.service';

describe('ScheduledTaskService', () => {
    let service: ScheduledTaskService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ScheduledTaskService],
        }).compile();

        service = module.get<ScheduledTaskService>(ScheduledTaskService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
