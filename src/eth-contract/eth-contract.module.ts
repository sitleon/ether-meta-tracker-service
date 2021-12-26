import { Module } from '@nestjs/common';
import { EthContractService } from './eth-contract.service';
import { EthProviderModule } from '../eth-provider/eth-provider.module';
import { EthSignerModule } from 'src/eth-signer/eth-signer.module';

@Module({
    imports: [EthProviderModule, EthSignerModule],
    providers: [EthContractService],
})
export class EthContractModule {}
