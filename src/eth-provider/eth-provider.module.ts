import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EthProviderService } from './eth-provider.service';

@Module({
    imports: [PrismaModule],
    providers: [EthProviderService],
    exports: [EthProviderService],
})
export class EthProviderModule {}
