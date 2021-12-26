import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthereumModule } from './ethereum/ethereum.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [EthereumModule, PrismaModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
