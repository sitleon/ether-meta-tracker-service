/* eslint-disable @typescript-eslint/ban-ts-comment */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
    let service: PrismaService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PrismaService],
        }).compile();

        service = module.get<PrismaService>(PrismaService);
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should set up middleware during creation', () => {
        const spy = jest.spyOn(PrismaService.prototype, '$use');
        new PrismaService();

        expect(spy).toBeCalledTimes(1);
    });

    it('should called set-up logger', () => {
        const spy = jest.spyOn(service, '$on');
        // @ts-ignore
        service.setUpLogger();

        expect(spy).toBeCalledTimes(4);
    });

    it('should trigger application exit if connect closed', async () => {
        const mockApp: INestApplication = { close: jest.fn() } as any;
        const spy = jest.spyOn(service, '$on');
        await service.enableShutdownHooks(mockApp);

        expect(spy).toBeCalledTimes(1);
    });

    it('should build where-input, omit undefined and convert array', () => {
        const params = { id: 'a', name: undefined, type: [1, 2] };
        const result = service.buildWhereInput(params);

        expect(result).toEqual({ id: 'a', type: { in: [1, 2] } });
    });

    it('should build where-input, convert array and will not omit undefined', () => {
        const params = { id: 'a', name: undefined, type: [1, 2] };
        const result = service.buildWhereInput(params, false);

        expect(result).toEqual({ id: 'a', type: { in: [1, 2] } });
    });
});
