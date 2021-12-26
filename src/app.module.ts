import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthProviderModule } from './eth-provider/eth-provider.module';
import { PrismaModule } from './prisma/prisma.module';
import { EthSignerModule } from './eth-signer/eth-signer.module';
import { EthContractModule } from './eth-contract/eth-contract.module';

@Module({
    imports: [
        EthProviderModule,
        PrismaModule,
        EthSignerModule,
        EthContractModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
