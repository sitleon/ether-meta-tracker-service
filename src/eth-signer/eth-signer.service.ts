import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { EthProviderService } from '../eth-provider/eth-provider.service';

@Injectable()
export class EthSignerService {
    private readonly signer: ethers.Wallet;

    constructor(private readonly provider: EthProviderService) {
        this.signer = new ethers.Wallet(
            process.env.ETH_SIGNER_PRIVATE_KEY,
            provider.getProvider(),
        );
    }

    getSigner(): ethers.Wallet {
        return this.signer;
    }
}
