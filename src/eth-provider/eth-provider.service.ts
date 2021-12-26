import { Injectable } from '@nestjs/common';
import { ethers, BigNumber } from 'ethers';
import * as fastq from 'fastq';

import { PrismaService } from '../prisma/prisma.service';
import { transformToDto } from '../utils/transfer-eth-obj';

import { CreateBlockDto } from './eth-provider.dto';
import type { blockMeta } from './eth-provider.interface';

import * as moment from 'moment';

@Injectable()
export class EthProviderService {
    private readonly provider: ethers.providers.Provider;
    private readonly fetchQueue = fastq.promise((fn: () => any) => fn(), 10);

    constructor(private prisma: PrismaService) {
        this.provider = new ethers.providers.EtherscanProvider(
            process.env.ETH_NETWORK,
            process.env.ETHERSCAN_API_KEY,
        );

        this.provider.on('block', async (blockNumber) => {
            return this.fetchQueue.push(async () =>
                this.fetchingBlock(blockNumber),
            );
        });
    }

    private async fetchingBlock(blockNumber: number) {
        const rawBlock = await this.provider.getBlockWithTransactions(
            blockNumber,
        );

        const { transactions: txnDtos, ...blockDto } = transformToDto(
            CreateBlockDto,
            rawBlock,
        );

        await this.prisma.block.create({
            data: {
                ...blockDto,
                transactions: {
                    create: txnDtos,
                },
            },
        });
    }

    async getDailyBlockMeta(timestamp: number): Promise<blockMeta> {
        const blocks = [];

        const take = 33062;
        for (let skip = 0; true; skip += take) {
            const _blocks = await this.prisma.block.findMany({
                select: {
                    hash: true,
                    number: true,
                    timestamp: true,
                    gasUsed: true,
                },
                where: {
                    timestamp: {
                        gte: timestamp,
                        lte: moment.unix(timestamp).add(1, 'days').unix(),
                    },
                },
                skip,
                take: 33062,
            });

            blocks.push(..._blocks);

            if (_blocks.length === 0) {
                break;
            }
        }

        const gasUsed = blocks.reduce((acc, block) => {
            return acc.add(block?.gasUsed ?? 0);
        }, BigNumber.from('0x0'));

        return {
            timestamp,
            numberOfBlocks: blocks.length,
            gasUsed,
        };
    }

    getProvider(): ethers.providers.Provider {
        return this.provider;
    }
}
