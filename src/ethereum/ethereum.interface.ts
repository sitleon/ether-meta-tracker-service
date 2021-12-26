import type { BigNumber } from 'ethers';

export interface blockMeta {
    timestamp: number;
    numberOfBlocks: number;
    gasUsed: BigNumber;
}
