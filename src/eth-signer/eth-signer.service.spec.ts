import { Test, TestingModule } from '@nestjs/testing';
import { EthSignerService } from './eth-signer.service';

describe('EthSignerService', () => {
    let service: EthSignerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EthSignerService],
        }).compile();

        service = module.get<EthSignerService>(EthSignerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
