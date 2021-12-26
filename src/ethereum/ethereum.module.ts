import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EthereumService } from './ethereum.service';

@Module({
    imports: [PrismaModule],
    providers: [EthereumService],
})
export class EthereumModule {}
