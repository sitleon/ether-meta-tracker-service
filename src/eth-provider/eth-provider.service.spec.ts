import { Test, TestingModule } from '@nestjs/testing';
import { EthProviderService } from './eth-provider.service';

describe('EthProvider', () => {
    let service: EthProviderService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EthProviderService],
        }).compile();

        service = module.get<EthProviderService>(EthProviderService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
