import { Module } from '@nestjs/common';
import { EthSignerService } from './eth-signer.service';
import { EthProviderModule } from '../eth-provider/eth-provider.module';

@Module({
    imports: [EthProviderModule],
    providers: [EthSignerService],
    exports: [EthSignerService],
})
export class EthSignerModule {}
