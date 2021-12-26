import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';

import { EthProviderService } from '../eth-provider/eth-provider.service';
import { EthContractService } from '../eth-contract/eth-contract.service';

@Injectable()
export class ScheduledTaskService {
    constructor(
        private readonly provider: EthProviderService,
        private readonly contract: EthContractService,
    ) {}

    @Cron('30 0 * * *')
    async updateEthContract() {
        const blockMeta = await this.provider.getDailyBlockMeta(
            moment().startOf('day').unix(),
        );

        await this.contract.updateDailyMeta(blockMeta);
    }
}
