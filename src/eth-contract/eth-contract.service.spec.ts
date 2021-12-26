import { Test, TestingModule } from '@nestjs/testing';
import { EthContractService } from './eth-contract.service';

describe('EthContractService', () => {
    let service: EthContractService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EthContractService],
        }).compile();

        service = module.get<EthContractService>(EthContractService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
