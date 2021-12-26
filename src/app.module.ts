import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EthProviderModule } from './eth-provider/eth-provider.module';
import { PrismaModule } from './prisma/prisma.module';
import { EthSignerModule } from './eth-signer/eth-signer.module';
import { EthContractModule } from './eth-contract/eth-contract.module';
import { ScheduledTaskModule } from './scheduled-task/scheduled-task.module';

@Module({
    imports: [
        EthProviderModule,
        PrismaModule,
        EthSignerModule,
        EthContractModule,
        ScheduledTaskModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
