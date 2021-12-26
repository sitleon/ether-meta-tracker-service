import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduledTaskService } from './scheduled-task.service';

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [ScheduledTaskService],
})
export class ScheduledTaskModule {}
